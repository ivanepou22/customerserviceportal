page 50008 "API Sales Invoice Lines"
{
    PageType = API;
    APIPublisher = 'serviceportal';
    APIGroup = 'customerserviceportal';
    DelayedInsert = true;
    Caption = 'API Sales Invoice Lines';
    APIVersion = 'v1.0';
    EntityName = 'salesinvoiceline';
    EntitySetName = 'salesinvoicelines';
    SourceTable = "Sales Invoice Line";
    ODataKeyFields = "Document No.", "Line No.";
    Editable = false;
    InsertAllowed = false;
    ModifyAllowed = false;
    DeleteAllowed = false;

    layout
    {
        area(content)
        {
            field(sellToCustomerNo; Rec."Sell-to Customer No.") { }
            field(documentNo; Rec."Document No.") { }
            field(lineNo; Rec."Line No.") { }
            field(type; Rec.Type) { }
            field(no; Rec."No.") { }
            field(description; Rec.Description) { }
            field(description2; Rec."Description 2") { }
            field(unitOfMeasureCode; Rec."Unit of Measure Code") { }
            field(unitOfMeasure; Rec."Unit of Measure") { }
            field(quantity; Rec.Quantity) { }
            field(unitPrice; Rec."Unit Price") { }
            field(lineDiscountPercentange; Rec."Line Discount %") { }
            field(lineDiscountAmount; Rec."Line Discount Amount") { }
            field(lineAmount; Rec."Line Amount") { }
            field(lineAmountExclVAT; Rec.Amount) { }
            field(lineAmountInclVAT; Rec."Amount Including VAT") { }
        }
    }
}