page 50002 "API Sales Lines"
{
    PageType = API;
    APIPublisher = 'serviceportal';
    APIGroup = 'customerserviceportal';
    DelayedInsert = true;
    Caption = 'Sales Lines';
    APIVersion = 'v1.0';
    EntityName = 'salesline';
    EntitySetName = 'saleslines';
    SourceTable = "Sales Line";
    ODataKeyFields = "Document Type", "Document No.", "Line No.";
    Editable = false;
    InsertAllowed = false;
    ModifyAllowed = false;
    DeleteAllowed = false;

    layout
    {
        area(content)
        {
            field(documentType; Rec."Document Type") { }
            field(documentNo; Rec."Document No.") { }
            field(lineNo; Rec."Line No.") { }
            field(type; Rec.Type) { }
            field(no; Rec."No.") { }
            field(description; Rec.Description) { }
            field(description2; Rec."Description 2") { }
            field(unitOfMeasureCode; Rec."Unit of Measure Code") { }
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