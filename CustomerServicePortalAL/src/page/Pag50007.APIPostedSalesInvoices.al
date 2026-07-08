page 50007 "API Posted Sales Invoices"
{
    PageType = API;
    APIPublisher = 'serviceportal';
    APIGroup = 'customerserviceportal';
    DelayedInsert = true;
    Caption = 'API Posted Sales Invoices';
    APIVersion = 'v1.0';
    EntityName = 'postedSalesInvoice';
    EntitySetName = 'postedSalesInvoices';
    SourceTable = "Sales Invoice Header";
    ODataKeyFields = "No.";
    Editable = false;
    InsertAllowed = false;
    ModifyAllowed = false;
    DeleteAllowed = false;

    layout
    {
        area(Content)
        {
            repeater(GroupName)
            {
                field(postingDate; Rec."Posting Date") { }
                field(no; Rec."No.") { }
                field(sellToCustomerNo; Rec."Sell-to Customer No.") { }
                field(sellToCustomerName; Rec."Sell-to Customer Name") { }
                field("SellToContact"; Rec."Sell-to Contact") { }
                field(postingDescription; Rec."Posting Description") { }
                field(currencyCode; Rec."Currency Code") { }
                field(orderNo; Rec."Order No.") { }
                field(dueDate; Rec."Due Date") { }
                field(orderDate; Rec."Order Date") { }
                field(amount; Rec.Amount) { }
                field(amountIncludingVAT; Rec."Amount Including VAT") { }
                part(lines; "API Sales Invoice Lines")
                {
                    EntityName = 'salesinvoiceline';
                    EntitySetName = 'salesinvoicelines';
                    SubPageLink = "Document No." = field("No.");
                }
            }
        }
    }
}