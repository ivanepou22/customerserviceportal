page 50016 "API Customer Credit Memos"
{
    PageType = API;
    APIPublisher = 'serviceportal';
    APIGroup = 'customerserviceportal';
    DelayedInsert = true;
    Caption = 'API Customer Credit Memos';
    APIVersion = 'v1.0';
    EntityName = 'customercreditmemos';
    EntitySetName = 'customercreditmemos';
    SourceTable = "Cust. Ledger Entry";
    SourceTableView = where("Document Type" = filter("Credit Memo"));
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
                field(documentType; Rec."Document Type") { }
                field(documentNo; Rec."Document No.") { }
                field(description; Rec.Description) { }
                field(customerNo; Rec."Customer No.") { }
                field(customerName; Rec."Customer Name") { }
                field(sellToCustomerNo; Rec."Sell-to Customer No.") { }
                field(currencyCode; Rec."Currency Code") { }
                field(amount; Rec.Amount) { }
                field(amountLCY; Rec."Amount (LCY)") { }
                field(documentDate; Rec."Document Date") { }
                field(remainingAmount; Rec."Remaining Amount") { }
                field(remainingAmt_LCY; Rec."Remaining Amt. (LCY)") { }
                field(Reversed; Rec.Reversed) { }
                field(Open; Rec.Open) { }
            }
        }
    }
}