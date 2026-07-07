page 50003 "API Portal Users"
{
    PageType = API;
    Caption = 'API Portal Users';
    APIPublisher = 'serviceportal';
    APIGroup = 'customerserviceportal';
    APIVersion = 'v1.0';
    EntityName = 'portalUser';
    EntitySetName = 'portalUsers';
    SourceTable = PortalUser;
    DelayedInsert = true;
    ODataKeyFields = Email;

    layout
    {
        area(Content)
        {
            repeater(GroupName)
            {
                field(email; Rec.Email)
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the Email field.', Comment = '%';
                }
                field(name; Rec.Name)
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the Name field.', Comment = '%';
                }
                field(password; Rec.Password)
                {
                    Caption = 'Password';
                }
                field(customerNo; Rec."Customer No.")
                {
                    ApplicationArea = All;
                    Editable = false;
                    ToolTip = 'Specifies the value of the Customer No. field.', Comment = '%';
                }
                field(customerName; Rec."Customer Name")
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the Customer Name field.', Comment = '%';
                }
                field(role; Rec.Role)
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the Role field.', Comment = '%';
                }
                field(active; Rec.Active)
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the Active field.', Comment = '%';
                }
                field(lastLogin; Rec."Last Login")
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the Last Login field.', Comment = '%';
                }
                field(SystemCreatedAt; Rec.SystemCreatedAt)
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the SystemCreatedAt field.', Comment = '%';
                }
                field(SystemCreatedBy; Rec.SystemCreatedBy)
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the SystemCreatedBy field.', Comment = '%';
                }
                field(SystemId; Rec.SystemId)
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the SystemId field.', Comment = '%';
                }
                field(SystemModifiedAt; Rec.SystemModifiedAt)
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the SystemModifiedAt field.', Comment = '%';
                }
                field(SystemModifiedBy; Rec.SystemModifiedBy)
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the SystemModifiedBy field.', Comment = '%';
                }
            }
        }
    }
}