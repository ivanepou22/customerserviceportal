table 50001 "Journal Based Doc. Print Contr"
{
    // version

    fields
    {
        field(1; "Table ID"; Integer)
        {
            TableRelation = AllObj."Object ID" WHERE("Object Type" = CONST(Table));
        }
        field(2; "Entry No"; Integer)
        {
        }
        field(3; "Account Type"; Option)
        {
            OptionMembers = "G/L Account",Customer,Vendor,"Bank Account","Fixed Asset";
        }
        field(4; "Account No."; Code[20])
        {
            Caption = 'Customer No.';
        }
        field(5; "Posting Date"; Date)
        {
            Caption = 'Posting Date';
        }
        field(6; "Document Type"; Option)
        {
            OptionMembers = " ",Payment,Invoice,"Credit Memo","Finance Charge Memo",Reminder,Refund;
        }
        field(7; "Document No"; Code[20])
        {
        }
        field(10; "No. Printed"; Integer)
        {
        }
        field(11; "Last Date Printed"; DateTime)
        {
        }
        field(12; "Last Print By"; Code[100])
        {
        }
    }

    keys
    {
        key(Key1; "Table ID", "Entry No")
        {
        }
    }

    fieldgroups
    {
    }
}

