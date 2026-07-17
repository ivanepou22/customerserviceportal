page 50013 "API Customer Reports"
{
    PageType = API;
    APIPublisher = 'serviceportal';
    APIGroup = 'customerserviceportal';
    DelayedInsert = true;
    Caption = 'API Customer Reports';
    APIVersion = 'v1.0';
    EntityName = 'customerReport';
    EntitySetName = 'customerReports';
    SourceTable = "Customer";
    ODataKeyFields = "No.";
    Editable = false;
    InsertAllowed = false;
    ModifyAllowed = false;
    DeleteAllowed = false;

    layout
    {
        area(content)
        {
            field(number; Rec."No.") { }
        }
    }

    [ServiceEnabled]
    [Scope('Cloud')]
    procedure GetCustomerDetailedTrialBalance(customerNo: Code[20]; startDate: text; endDate: Text): Text
    var
        Start_Date: Date;
        End_Date: Date;
    begin
        Evaluate(Start_Date, startDate);
        Evaluate(End_Date, endDate);
        exit(GeneratePdf(Report::"Customer - Detail Trial Bal.", customerNo, Start_Date, End_Date));
    end;

    [ServiceEnabled]
    [Scope('Cloud')]
    procedure GetCustomerStatement(customerNo: Code[20]; startDate: Text; endDate: Text): Text
    var
        Start_Date: Date;
        End_Date: Date;
    begin
        Evaluate(Start_Date, startDate);
        Evaluate(End_Date, endDate);
        exit(GenerateCustomerStatementPdf(CustomerNo, Start_Date, End_Date));
    end;

    [ServiceEnabled]
    [Scope('Cloud')]
    procedure GetARAging(CustomerNo: Code[20]; AsOfDate: Date): Text
    begin
        exit(GenerateARAgingPdf(customerNo, asOfDate));
    end;

    local procedure GeneratePdf(
    ReportId: Integer;
    CustNo: Code[20];
    StartDate: Date;
    EndDate: Date): Text
    var
        OutS: OutStream;
        InS: InStream;
        TempBlob: Codeunit "Temp Blob";
        Base64: Codeunit "Base64 Convert";
        RecRef: RecordRef;
        Customer: Record Customer;
    begin
        if CustNo = '' then
            Error('Customer number is required.');

        if not Customer.Get(CustNo) then
            Error('Customer %1 does not exist.', CustNo);

        Customer.Reset();
        Customer.SetRange("No.", CustNo);

        if StartDate = 0D then
            Error('Start date is required.');

        if EndDate = 0D then
            Error('End date is required.');

        Customer.SetRange("Date Filter", StartDate, EndDate);
        RecRef.GetTable(Customer);
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

    local procedure GenerateCustomerStatementPdf(CustNo: Code[20]; StartDate: Date; EndDate: Date): Text
    var
        OutS: OutStream;
        InS: InStream;
        TempBlob: Codeunit "Temp Blob";
        Base64: Codeunit "Base64 Convert";
        Customer: Record Customer;
        CustomerRecRef: RecordRef;
        StatementReport: Report Statement;
        DateChoice: Option "Due Date","Posting Date";
    begin
        if CustNo = '' then
            Error('Customer number is required.');

        if StartDate = 0D then
            Error('Start date is required.');

        if EndDate = 0D then
            Error('End date is required.');

        if not Customer.Get(CustNo) then
            Error('Customer %1 does not exist.', CustNo);

        Customer.Reset();
        Customer.SetRange("No.", CustNo);
        Customer.SetRange("Date Filter", StartDate, EndDate);

        CustomerRecRef.GetTable(Customer);

        StatementReport.InitializeRequest(
            false, // Show Overdue Entries
            false, // Include All Customers with Ledger Entries
            true,  // Include All Customers with a Balance
            false, // Include Reversed Entries
            false, // Include Unapplied Entries
            false, // Include Aging Band
            '<1M+CM>', // Aging Band Period Length
            DateChoice::"Posting Date", // Aging Band by
            false, // Log Interaction. Important for API calls
            StartDate,
            EndDate
        );

        TempBlob.CreateOutStream(OutS);

        StatementReport.SaveAs(
            '',
            ReportFormat::Pdf,
            OutS,
            CustomerRecRef
        );

        TempBlob.CreateInStream(InS);
        exit(Base64.ToBase64(InS));
    end;

    local procedure GenerateARAgingPdf(CustNo: Code[20]; AsOfDate: Date): Text
    var
        OutS: OutStream;
        InS: InStream;
        TempBlob: Codeunit "Temp Blob";
        Base64: Codeunit "Base64 Convert";
        Customer: Record Customer;
        CustomerRecRef: RecordRef;
        AgedARReport: Report "Aged Accounts Receivable";
        AgingBy: Option "Due Date","Posting Date","Document Date";
        HeadingType: Option "Date Interval","Number of Days";
        PeriodLength: DateFormula;
    begin
        if CustNo = '' then
            Error('Customer number is required.');

        if AsOfDate = 0D then
            Error('Aged as of date is required.');

        if not Customer.Get(CustNo) then
            Error('Customer %1 does not exist.', CustNo);

        Customer.Reset();
        Customer.SetRange("No.", CustNo);

        CustomerRecRef.GetTable(Customer);

        Evaluate(PeriodLength, '30D');

        AgedARReport.InitializeRequest(
            AsOfDate,                 // Aged as of
            AgingBy::"Posting Date",  // Aged by. Use this for "Trans Date" / transaction date
            PeriodLength,             // Length of Aging Periods
            false,                    // Print Amounts in Customer's Currency / LCY option
            false,                    // Print Detail
            HeadingType::"Date Interval", // Heading type
            false                     // New page per customer
        );

        TempBlob.CreateOutStream(OutS);

        AgedARReport.SaveAs(
            '',
            ReportFormat::Pdf,
            OutS,
            CustomerRecRef
        );

        TempBlob.CreateInStream(InS);
        exit(Base64.ToBase64(InS));
    end;
}