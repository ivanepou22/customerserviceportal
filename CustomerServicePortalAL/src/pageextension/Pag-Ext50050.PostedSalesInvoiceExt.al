pageextension 50050 "Posted Sales Invoice Ext" extends "Posted Sales Invoice"
{
    layout
    {
        // Add changes to page layout here
    }

    actions
    {
        // Add changes to page actions here
        modify(Print)
        {
            Visible = false;
        }

        addafter(Print)
        {
            action(Printable)
            {
                ApplicationArea = All;
                Caption = 'Print';
                Promoted = true;
                PromotedCategory = Category6;
                PromotedIsBig = true;
                Image = Print;

                trigger OnAction()
                var
                    SalesHeader: Record "Sales Invoice Header";
                    PrintSalesInvoice: Report "Standard Sales - Invoice";
                begin
                    SalesHeader.Reset();
                    SalesHeader.SetRange(SalesHeader."No.", Rec."No.");
                    SalesHeader.SetRange(SalesHeader."Sell-to Customer No.", Rec."Sell-to Customer No.");

                    Report.RunModal(
                        Report::"Standard Sales - Invoice",
                        true,
                        false,
                        SalesHeader);

                end;
            }
        }
    }

    var
        myInt: Integer;
}