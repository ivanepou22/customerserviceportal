tableextension 50050 "General Ledger SetupExt" extends "General Ledger Setup"
{
    fields
    {
        // Add changes to table fields here
        field(50050; "QrCode Url"; Text[500])
        {
            DataClassification = ToBeClassified;
        }
        field(50051; "QRCode Verification URL"; Text[500])
        {
            DataClassification = ToBeClassified;
        }
    }

    keys
    {
        // Add changes to keys here
    }

    fieldgroups
    {
        // Add changes to field groups here
    }
}