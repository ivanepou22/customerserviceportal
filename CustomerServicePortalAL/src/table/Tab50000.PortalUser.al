table 50000 PortalUser
{
    DataClassification = ToBeClassified;

    fields
    {
        field(1; Email; Text[250])
        {
            extendeddatatype = Email;
        }
        field(2; Password; Text[250])
        {
            extendeddatatype = Masked;
        }
        field(3; Name; Text[250])
        {
        }
        field(4; "Customer No."; Code[30])
        {
            TableRelation = Customer."No.";
            trigger OnValidate()
            var
                Customer: Record Customer;
            begin
                if Rec."Customer No." <> '' then begin
                    Customer.Get(Rec."Customer No.");
                    Rec."Customer Name" := Customer.Name;
                end;
            end;
        }
        field(5; Active; Boolean)
        {
            DataClassification = CustomerContent;
        }
        field(6; "Last Login"; DateTime)
        {
            DataClassification = CustomerContent;
        }
        field(8; Role; Enum "Portal User Role")
        {
            DataClassification = CustomerContent;
        }
        field(9; "Customer Name"; Text[250])
        {
            DataClassification = ToBeClassified;
        }
        field(10; "Change Password"; Boolean)
        {
            DataClassification = ToBeClassified;
        }
    }

    keys
    {
        key(Key1; Email)
        {
            Clustered = true;
        }
        key(CustomerKey; "Customer No.") { }
    }

    fieldgroups
    {
        // Add changes to field groups here
    }

    var
        PortalUser: Record PortalUser;

    trigger OnInsert()
    var
        Customer: Record Customer;
    begin
        if Rec."Customer No." = '' then
            Error('Customer No. is required.');

        if Rec.Email = '' then
            Error('Email is required.');

        if Rec.Password = '' then
            Error('Password is required.');

        if Rec.Name = '' then
            Error('Name is required.');

        if PortalUser.Get(Rec.Email) then
            Error('A user with this email:%1 already exists.', Rec.Email);
    end;

    trigger OnModify()
    begin

    end;

    trigger OnDelete()
    begin

    end;

    trigger OnRename()
    begin

    end;

}