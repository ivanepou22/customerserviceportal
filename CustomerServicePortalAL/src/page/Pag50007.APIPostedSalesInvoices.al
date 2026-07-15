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

        ReportId := Report::"Standard Sales - Invoice";
        RecRef.GetTable(Rec);

        TempBlob.CreateOutStream(OutS);
        Report.SaveAs(ReportId, '', ReportFormat::Pdf, OutS, RecRef);

        TempBlob.CreateInStream(InS);
        exit(Base64.ToBase64(InS));
    end;
}