page 50005 "API Sales Quotes"
{
    PageType = API;
    APIPublisher = 'serviceportal';
    APIGroup = 'customerserviceportal';
    DelayedInsert = true;
    Caption = 'API Sales Quotes';
    APIVersion = 'v1.0';
    EntityName = 'salesQuote';
    EntitySetName = 'salesQuotes';
    SourceTable = "Sales Header";
    SourceTableView = where("Document Type" = const(Quote), Amount = filter('>0'));
    ODataKeyFields = "No.", "Sell-to Customer No.";
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
                SubPageLink = "Document No." = field("No."), "Document Type" = field("Document Type");
            }
        }

    }

    trigger OnInsertRecord(BelowxRec: Boolean): Boolean
    begin
        Rec.Validate("Document Type");
    end;

    [ServiceEnabled]
    [Scope('Cloud')]
    procedure GetPdfBase64(): Text
    var
        ReportSelection: Record "Report Selections";
        OutS: OutStream;
        InS: InStream;
        TempBlob: Codeunit "Temp Blob";
        Base64: Codeunit "Base64 Convert";
        RecRef: RecordRef;
        ReportId: Integer;
        Usage: Enum "Report Selection Usage";
    begin
        if Rec."No." = '' then
            exit('');

        ReportId := Report::"Standard Sales - Quote";
        RecRef.GetTable(Rec);

        TempBlob.CreateOutStream(OutS);
        Report.SaveAs(ReportId, '', ReportFormat::Pdf, OutS, RecRef);

        TempBlob.CreateInStream(InS);
        exit(Base64.ToBase64(InS));
    end;
}