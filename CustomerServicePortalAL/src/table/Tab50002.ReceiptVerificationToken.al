table 50002 "Receipt Verification Token"
{
    Caption = 'Receipt Verification Token';
    DataClassification = CustomerContent;

    fields
    {
        field(1; "Token"; Code[50])
        {
            Caption = 'Token';
            DataClassification = SystemMetadata;
        }
        field(2; "Customer No."; Code[20])
        {
            Caption = 'Customer No.';
            TableRelation = Customer;
            DataClassification = CustomerContent;
        }
        field(3; "Entry No."; Integer)
        {
            Caption = 'Entry No.';
            DataClassification = CustomerContent;
        }
        field(4; "Created DateTime"; DateTime)
        {
            Caption = 'Created DateTime';
            DataClassification = SystemMetadata;
        }
        field(5; "Used"; Boolean)
        {
            Caption = 'Used';
            DataClassification = SystemMetadata;
        }
        field(6; "Created By"; Code[50])
        {
            Caption = 'Created By';
            DataClassification = EndUserIdentifiableInformation;
        }
    }

    keys
    {
        key(PK; "Token")
        {
            Clustered = true;
        }
        key(Key2; "Customer No.", "Entry No.")
        {
        }
    }

    procedure GenerateToken(CustomerLedgerEntry: Record "Cust. Ledger Entry"): Text
    var
        TokenRec: Record "Receipt Verification Token";
        NewToken: Text;
    begin
        NewToken := CreateGuid();
        NewToken := DelChr(NewToken, '=', '{}');

        TokenRec.Init();
        TokenRec.Token := CopyStr(NewToken, 1, MaxStrLen(TokenRec.Token));
        TokenRec."Customer No." := CustomerLedgerEntry."Customer No.";
        TokenRec."Entry No." := CustomerLedgerEntry."Entry No.";
        TokenRec."Created DateTime" := CurrentDateTime;
        TokenRec.Used := false;
        TokenRec."Created By" := UserId;
        TokenRec.Insert(true);

        exit(TokenRec.Token);
    end;
}