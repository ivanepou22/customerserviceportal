page 50009 "API Posted Sales Credit Memos"
{
    PageType = API;
    APIPublisher = 'serviceportal';
    APIGroup = 'customerserviceportal';
    DelayedInsert = true;
    Caption = 'API Posted Sales Credit Memos';
    APIVersion = 'v1.0';
    EntityName = 'postedSalesCreditMemo';
    EntitySetName = 'postedSalesCreditMemos';
    SourceTable = "Sales Cr.Memo Header";
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
                field(appliesToDocType; Rec."Applies-to Doc. Type") { }
                field(appliesToDocNo; Rec."Applies-to Doc. No.") { }
                field(externalDocumentNo; Rec."External Document No.") { }
                field(dueDate; Rec."Due Date") { }
                field(amount; Rec.Amount) { }
                field(amountIncludingVAT; Rec."Amount Including VAT") { }
                part(lines; "API Sales Credit Memo Lines")
                {
                    EntityName = 'salescreditmemoline';
                    EntitySetName = 'salescreditmemolines';
                    SubPageLink = "Document No." = field("No.");
                }
            }
        }
    }
}