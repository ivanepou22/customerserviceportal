page 50017 "Receipt Token API"
{
    PageType = API;
    Caption = 'Receipt Token API';
    APIPublisher = 'serviceportal';
    APIGroup = 'customerserviceportal';
    APIVersion = 'v1.0';
    EntityName = 'receiptToken';
    EntitySetName = 'receiptTokens';
    SourceTable = "Receipt Verification Token";
    DelayedInsert = true;
    ODataKeyFields = Token;
    Editable = false;
    InsertAllowed = false;
    ModifyAllowed = false;
    DeleteAllowed = false;

    layout
    {
        area(Content)
        {
            repeater(Group)
            {
                field(token; Rec.Token)
                {
                    Caption = 'Token';
                }
                field(customerNo; Rec."Customer No.")
                {
                    Caption = 'Customer No.';
                }
                field(entryNo; Rec."Entry No.")
                {
                    Caption = 'Entry No.';
                }
                field(used; Rec.Used)
                {
                    Caption = 'Used';
                }
            }
        }
    }

    [ServiceEnabled]
    [Scope('Cloud')]
    procedure GenerateCustomerReceipt(token: Text): Text
    var
        ReceiptToken: Record "Receipt Verification Token";
    begin
        if not ReceiptToken.Get(token) then
            Error('Receipt id: %1 is invalid.', token);

        exit(GeneratePdf(Report::"Cash/Check Receipt (Customer)", ReceiptToken."Customer No.", ReceiptToken."Entry No."));
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

        Customer.Reset();
        Customer.SetRange("No.", CustNo);
        if not Customer.FindFirst() then
            Error('Customer %1 does not exist.', CustNo);

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