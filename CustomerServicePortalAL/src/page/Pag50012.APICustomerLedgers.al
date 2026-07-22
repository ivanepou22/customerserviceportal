page 50012 "API Customer Ledgers"
{
    PageType = API;
    APIPublisher = 'serviceportal';
    APIGroup = 'customerserviceportal';
    DelayedInsert = true;
    Caption = 'API Customer Ledgers';
    APIVersion = 'v1.0';
    EntityName = 'customerledgers';
    EntitySetName = 'customerledgers';
    SourceTable = "Cust. Ledger Entry";
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

    [ServiceEnabled]
    [Scope('Cloud')]
    procedure GenerateReceipt(customerNo: Code[20]; entryNo: Text): Text
    var
        EntryNumber: Integer;
    begin
        Evaluate(EntryNumber, entryNo);
        exit(GeneratePdf(Report::"Cash/Check Receipt (Customer)", customerNo, EntryNumber));
    end;

    local procedure GeneratePdf(
    ReportId: Integer;
    CustNo: Code[20];
    EntryNo: Integer): Text
    var
        OutS: OutStream;
        InS: InStream;
        TempBlob: Codeunit "Temp Blob";
        Base64: Codeunit "Base64 Convert";
        RecRef: RecordRef;
        Customer: Record Customer;
        CustomerLedgerEntry: Record "Cust. Ledger Entry";
    begin
        if CustNo = '' then
            Error('Customer number is required.');

        if not Customer.Get(CustNo) then
            Error('Customer %1 does not exist.', CustNo);

        CustomerLedgerEntry.Reset();
        CustomerLedgerEntry.SetRange("Customer No.", CustNo);
        CustomerLedgerEntry.SetRange("Entry No.", EntryNo);
        if not CustomerLedgerEntry.FindFirst() then begin
            Error('Payment with: %1 was not found in the system.', EntryNo);
        end;

        RecRef.GetTable(CustomerLedgerEntry);
        TempBlob.CreateOutStream(OutS);

        Report.SaveAs(
            ReportId,
            '',
            ReportFormat::Pdf,
            OutS,
            RecRef
        );

        TempBlob.CreateInStream(InS);
        exit(Base64.ToBase64(InS));
    end;
}