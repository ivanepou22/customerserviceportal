page 50018 "Receipt Tokens"
{
    PageType = List;
    ApplicationArea = All;
    UsageCategory = Lists;
    SourceTable = "Receipt Verification Token";
    deleteAllowed = false;
    ModifyAllowed = false;
    editable = false;
    layout
    {
        area(Content)
        {
            repeater(GroupName)
            {
                field(Token; Rec.Token)
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the Token field.', Comment = '%';
                }
                field("Customer No."; Rec."Customer No.")
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the Customer No. field.', Comment = '%';
                }
                field("Entry No."; Rec."Entry No.")
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the Entry No. field.', Comment = '%';
                }
                field("Created DateTime"; Rec."Created DateTime")
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the Created DateTime field.', Comment = '%';
                }
                field("Created By"; Rec."Created By")
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the Created By field.', Comment = '%';
                }
                field(Used; Rec.Used)
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the Used field.', Comment = '%';
                }
            }
        }
        area(Factboxes)
        {

        }
    }

    actions
    {
        area(Processing)
        {
            action(ActionName)
            {

                trigger OnAction()
                begin

                end;
            }
        }
    }
}