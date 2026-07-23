pageextension 50051 "General Ledger Setup" extends "General Ledger Setup"
{
    layout
    {
        // Add changes to page layout here
        addafter(Application)
        {
            group(QRCode)
            {
                Caption = 'QR Code';
                field("QrCode Url"; Rec."QrCode Url")
                {
                    ApplicationArea = All;
                }
                field("QRCode Verification URL"; Rec."QRCode Verification URL")
                {
                    ApplicationArea = All;
                    ToolTip = 'Specifies the value of the QRCode Verification URL field.', Comment = '%';
                }
            }
        }
    }

    actions
    {
        // Add changes to page actions here
    }

    var
        myInt: Integer;
}