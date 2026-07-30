page 50000 "Portal Users"
{
    PageType = List;
    ApplicationArea = All;
    UsageCategory = Lists;
    SourceTable = PortalUser;
    InsertAllowed = false;

    layout
    {
        area(Content)
        {
            repeater(GroupName)
            {
                field(Email; Rec.Email)
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the Email field.', Comment = '%';
                }
                field(Name; Rec.Name)
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the Name field.', Comment = '%';
                }
                field("Customer No."; Rec."Customer No.")
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the Customer No. field.', Comment = '%';
                }
                field("Customer Name"; Rec."Customer Name")
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the Customer Name field.', Comment = '%';
                }
                field(Role; Rec.Role)
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the Role field.', Comment = '%';
                }
                field(Active; Rec.Active)
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the Active field.', Comment = '%';
                }
                field("Last Login"; Rec."Last Login")
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
        // Factboxes
    }

    actions
    {
        area(Navigation)
        {
            action(Activate)
            {
                ApplicationArea = All;
                Caption = 'Activate User';
                Promoted = true;
                PromotedCategory = Process;
                PromotedIsBig = true;
                Image = ActivateDiscounts;

                trigger OnAction()
                begin
                    PortalUser.Reset();
                    PortalUser.SetRange(Email, Rec.Email);
                    PortalUser.SetRange("Customer No.", Rec."Customer No.");
                    if PortalUser.FindFirst() then begin
                        PortalUser.TestField(Active, false);
                        PortalUser.Active := true;
                        PortalUser.Modify();
                    end;
                end;
            }
            action(Deactivate)
            {
                ApplicationArea = All;
                Caption = 'Deactivate User';
                Promoted = true;
                PromotedCategory = Process;
                PromotedIsBig = true;
                Image = ActivateDiscounts;

                trigger OnAction()
                begin
                    PortalUser.Reset();
                    PortalUser.SetRange(Email, Rec.Email);
                    PortalUser.SetRange("Customer No.", Rec."Customer No.");
                    if PortalUser.FindFirst() then begin
                        PortalUser.TestField(Active, true);
                        PortalUser.Active := false;
                        PortalUser.Modify();
                    end;
                end;
            }
        }
    }

    var
        PortalUser: Record PortalUser;
}