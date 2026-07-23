pageextension 50052 "Customer Ledger Entries" extends "Customer Ledger Entries"
{
    layout
    {
        // Add changes to page layout here
    }

    actions
    {
        addafter("Detailed &Ledger Entries")
        {
            action("Print Cash Receipt")
            {
                ApplicationArea = All;
                Caption = 'Print Cash Receipt';
                Promoted = true;
                PromotedCategory = Process;
                PromotedIsBig = true;
                Image = Print;
                trigger OnAction()
                var
                    DocPrint: Codeunit "Test Report-Print";
                    GCustNo: Code[50];
                    CustLedgEntry: Record "Cust. Ledger Entry";
                begin
                    CustLedgEntry.SETCURRENTKEY("Customer No.", "Document No.");
                    CustLedgEntry.SETRANGE("Customer No.", Rec."Customer No.");
                    CustLedgEntry.SETRANGE("Entry No.", Rec."Entry No.");
                    REPORT.RUNMODAL(REPORT::"Cash/Check Receipt (Customer)", TRUE, FALSE, CustLedgEntry);
                    GCustNo := Rec."Customer No.";
                    Rec.RESET;
                    Rec.SETFILTER("Customer No.", GCustNo);
                end;
            }
        }
    }

    var
        myInt: Integer;
}