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
    ODataKeyFields = "No.", "Sell-to Customer No.";
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

        ReportId := Report::"Standard Sales - Credit Memo";
        RecRef.GetTable(Rec);

        TempBlob.CreateOutStream(OutS);
        Report.SaveAs(ReportId, '', ReportFormat::Pdf, OutS, RecRef);

        TempBlob.CreateInStream(InS);
        exit(Base64.ToBase64(InS));
    end;
}