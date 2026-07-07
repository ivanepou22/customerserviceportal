codeunit 50000 "Portal User Management"
{
    Access = Public;

    var
        PortalUser: Record PortalUser;

    [ServiceEnabled]
    procedure RegisterUserFromPortal(Email: Text[100]; Name: Text[100]; CustomerNo: Code[20]; Role: Integer) ResponseJson: Text
    var
        NewUser: Record PortalUser;
        PortalRole: Enum "Portal User Role";
        Success: Boolean;
    begin
        Clear(ResponseJson);

        case Role of
            1:
                PortalRole := PortalRole::Admin;
            2:
                PortalRole := PortalRole::User;
            else begin
                ResponseJson := CreateErrorJson('Invalid role specified.', Format(Role));
                exit;
            end;
        end;

        if NewUser.Get(Email) then begin
            ResponseJson := CreateErrorJson('User with this email already exists.', Email);
            exit;
        end;

        if CustomerNo <> '' then begin
            if not ValidateCustomer(CustomerNo) then begin
                ResponseJson := CreateErrorJson('Invalid Customer No.', CustomerNo);
                exit;
            end;
        end;

        NewUser.Init();
        NewUser.Email := Email;
        NewUser.Name := Name;
        NewUser."Customer No." := CustomerNo;
        NewUser."Customer Name" := GetCustomerName(CustomerNo);
        NewUser.Role := PortalRole;
        NewUser.Active := false;
        NewUser."Last Login" := 0DT;

        Success := NewUser.Insert(true);

        if Success then
            ResponseJson := CreateSuccessJson(NewUser)
        else
            ResponseJson := CreateErrorJson('Failed to create user.', Email);
    end;

    [ServiceEnabled]
    procedure GetUserFromPortal(Email: Text[100]) ResponseJson: Text
    var
        UserRec: Record PortalUser;
    begin
        if UserRec.Get(Email) then
            ResponseJson := CreateSuccessJson(UserRec)
        else
            ResponseJson := CreateErrorJson('User not found.', Email);
    end;

    local procedure CreateSuccessJson(var UserRec: Record PortalUser) JsonText: Text
    var
        JObject: JsonObject;
    begin
        JObject.Add('success', true);
        JObject.Add('message', 'User registered successfully');
        JObject.Add('user', CreateUserJsonObject(UserRec));
        JObject.WriteTo(JsonText);
    end;

    local procedure CreateErrorJson(ErrorMsg: Text; Email: Text) JsonText: Text
    var
        JObject: JsonObject;
    begin
        JObject.Add('success', false);
        JObject.Add('message', ErrorMsg);
        JObject.Add('email', Email);
        JObject.WriteTo(JsonText);
    end;

    local procedure CreateUserJsonObject(var UserRec: Record PortalUser) JUser: JsonObject
    begin
        JUser.Add('email', UserRec.Email);
        JUser.Add('name', UserRec.Name);
        JUser.Add('customerNo', UserRec."Customer No.");
        JUser.Add('customerName', UserRec."Customer Name");
        JUser.Add('role', Format(UserRec.Role));
        JUser.Add('active', UserRec.Active);
        JUser.Add('lastLogin', Format(UserRec."Last Login", 0, 9));
        JUser.Add('systemId', UserRec.SystemId);
    end;

    local procedure ValidateCustomer(CustomerNo: Code[20]): Boolean
    var
        Customer: Record Customer;
    begin
        exit(Customer.Get(CustomerNo));
    end;

    local procedure GetCustomerName(CustomerNo: Code[20]): Text[100]
    var
        Customer: Record Customer;
    begin
        if Customer.Get(CustomerNo) then
            exit(Customer.Name);
        exit('');
    end;

    [ServiceEnabled]
    procedure UpdateLastLogin(Email: Text[100]) ResponseJson: Text
    var
        UserRec: Record PortalUser;
    begin
        if UserRec.Get(Email) then begin
            UserRec."Last Login" := CurrentDateTime;
            if UserRec.Modify(true) then
                ResponseJson := CreateSuccessJson(UserRec)
            else
                ResponseJson := CreateErrorJson('Failed to update last login.', Email);
        end else
            ResponseJson := CreateErrorJson('User not found.', Email);
    end;

    [ServiceEnabled]
    procedure Ping() Message: Text
    begin
        Message := 'Ping successful - Codeunit is working!';
    end;
}