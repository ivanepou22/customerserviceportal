page 50004 "API Sales Invoices"
{
    PageType = API;
    APIPublisher = 'serviceportal';
    APIGroup = 'customerserviceportal';
    DelayedInsert = true;
    Caption = 'API Sales Invoices';
    APIVersion = 'v1.0';
    EntityName = 'salesInvoice';
    EntitySetName = 'salesInvoices';
    SourceTable = "Sales Header";
    SourceTableView = where("Document Type" = const(Invoice), Amount = filter('>0'));
    ODataKeyFields = "No.";
    Editable = false;
    InsertAllowed = false;
    ModifyAllowed = false;
    DeleteAllowed = false;

    layout
    {
        area(content)
        {
            field(documentType; Rec."Document Type") { }
            field(number; Rec."No.")
            {
                trigger OnAssistEdit()
                begin
                    if Rec.AssistEdit(xRec) then
                        CurrPage.Update();
                end;
            }
            field(sellToCustomerNo; Rec."Sell-to Customer No.")
            {
                trigger OnValidate()
                begin
                    Rec.SelltoCustomerNoOnAfterValidate(Rec, xRec);
                    CurrPage.Update();
                end;
            }
            field(sellToCustomerName; Rec."Sell-to Customer Name") { }
            field("SellToContact"; Rec."Sell-to Contact") { }
            field(orderDate; Rec."Order Date") { }
            field(postingDescription; Rec."Posting Description") { }
            field(postingDate; Rec."Posting Date") { }
            field(dueDate; Rec."Due Date") { }
            field(currencyCode; Rec."Currency Code") { }
            field(Amount; Rec.Amount) { }
            field(AmountIncludingVAT; Rec."Amount Including VAT") { }
            field(VATAmount; Rec."Amount Including VAT" - Rec.Amount) { }
            part(salesLines; "API Sales Lines")
            {
                EntityName = 'salesline';
                EntitySetName = 'saleslines';
                SubPageLink = "Document No." = field("No.");
            }
        }

    }

    trigger OnInsertRecord(BelowxRec: Boolean): Boolean
    begin
        Rec.Validate("Document Type");
    end;
}