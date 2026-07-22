/// <summary>
/// Report Cash/Check Receipt (Customer) (ID 50125).
/// </summary>
report 50125 "Cash/Check Receipt (Customer)"
{
    // version rbm-AA,JOM-AA

    // Company."Letter Head"
    DefaultLayout = RDLC;
    RDLCLayout = './CashCheck Receipt (Customer).rdl';
    UsageCategory = ReportsAndAnalysis;


    dataset
    {
        dataitem("Cust. Ledger Entry"; "Cust. Ledger Entry")
        {
            DataItemTableView = SORTING("Entry No.");
            MaxIteration = 2;
            RequestFilterFields = "Entry No.";
            column(FORMAT_TODAY_0_4_; FORMAT(TODAY, 0, 4))
            {
            }
            column(Company__Phone_No__; Company."Phone No.")
            {
            }
            column(Company__Fax_No__; Company."Fax No.")
            {
            }
            column(Logo; Company.Picture)
            {
            }
            column(Receipttext; Receipttext)
            {
            }
            column(Cust__Ledger_Entry__Cust__Ledger_Entry___Document_No__; "Cust. Ledger Entry"."Document No.")
            {
            }
            column(Cust__Ledger_Entry__Cust__Ledger_Entry___Global_Dimension_2_Code_; "Cust. Ledger Entry"."Global Dimension 2 Code")
            {
            }
            column(FORMAT__Cust__Ledger_Entry___Posting_Date__0_4_; FORMAT("Cust. Ledger Entry"."Posting Date", 0, 4))
            {
            }
            column(codeHeader; codeHeader)
            {
            }
            column(GCopyTxt; GCopyTxt)
            {
            }
            column(Cust__Ledger_Entry__Customer_No__; "Customer No.")
            {
            }
            column(CustRec_Name; CustRec.Name)
            {
            }
            column(CustRec_Search_Name; CustRec."Search Name")
            {
            }
            column(GCustNameText; GCustNameText)
            {
            }
            column(GSettleText_1_; GSettleText[1])
            {
            }
            column(GSettleText_2_; GSettleText[2])
            {
            }
            column(GSettleText_3_; GSettleText[3])
            {
            }
            column(GSettleText_4_; GSettleText[4])
            {
            }
            column(GSettleText_5_; GSettleText[5])
            {
            }
            column(GSettleText_6_; GSettleText[6])
            {
            }
            column(GSettleText_7_; GSettleText[7])
            {
            }
            column(GSettleText_8_; GSettleText[8])
            {
            }
            column(GSettleText_9_; GSettleText[9])
            {
            }
            column(GSettleText_10_; GSettleText[10])
            {
            }
            column(txtNotify; txtNotify)
            {
            }
            column(USERID; USERID)
            {
            }
            column(Cust__Ledger_Entry__Cust__Ledger_Entry___User_ID_; "Cust. Ledger Entry"."User ID")
            {
            }
            column(For______Company__Short_Name_; 'For: ' + Company.Name)
            {
            }
            column(UseCheckNo; UseCheckNo)
            {
            }
            column(AmountText_1______AmountText_2_; AmountText[1] + ' ' + AmountText[2])
            {
            }
            column(Cust__Ledger_Entry_Amount; Amount)
            {
                DecimalPlaces = 0 : 0;
            }
            column(AmountText_2_; AmountText[2])
            {
            }
            column(Receipt_No_Caption; Receipt_No_CaptionLbl)
            {
            }
            column(Phone_No___Caption; Phone_No___CaptionLbl)
            {
            }
            column(Fax_No___Caption; Fax_No___CaptionLbl)
            {
            }
            column(Rev__Stream_Caption; Rev__Stream_CaptionLbl)
            {
            }
            column(Print_Date_Caption; Print_Date_CaptionLbl)
            {
            }
            column(Transaction_Date_Caption; Transaction_Date_CaptionLbl)
            {
            }
            column(Received_fromCaption; Received_fromCaptionLbl)
            {
            }
            column(Invoice_No___s_Caption; Invoice_No___s_CaptionLbl)
            {
            }
            column(Date__Signature_and_StampCaption; Date__Signature_and_StampCaptionLbl)
            {
            }
            column(EmptyStringCaption; EmptyStringCaptionLbl)
            {
            }
            column(Transaction_was_posted_by_Caption; Transaction_was_posted_by_CaptionLbl)
            {
            }
            column(Signed_Caption; Signed_CaptionLbl)
            {
            }
            column(With_ThanksCaption; With_ThanksCaptionLbl)
            {
            }
            column(Amount_in_wordsCaption; Amount_in_wordsCaptionLbl)
            {
            }
            column(Cust__Ledger_Entry_AmountCaption; FIELDCAPTION(Amount))
            {
            }
            column(Cust__Ledger_Entry_Entry_No_; "Entry No.")
            {
            }
            dataitem(Integer; Integer)
            {
                DataItemLinkReference = "Cust. Ledger Entry";
                DataItemTableView = SORTING(Number)
                                    WHERE(Number = FILTER(1 ..));
                MaxIteration = 3;

                trigger OnPreDataItem();
                begin
                    SETRANGE(Number, 1, 3);
                end;
            }

            trigger OnAfterGetRecord();
            var
                LCustLedEntryREC: Record "Cust. Ledger Entry";
                LController: Integer;
                "====SAW": Integer;
                CustLedgEntry: Record "Cust. Ledger Entry";
                LDetCustLedEntry: Record "Detailed Cust. Ledg. Entry";
                DtldCustLedgEntry1: Record "Detailed Cust. Ledg. Entry";
                DtldCustLedgEntry2: Record "Detailed Cust. Ledg. Entry";
            begin
                LController := 1;
                FnPrintControl("Cust. Ledger Entry", LController);

                GCustNameText := '';
                txtRevStream := '';
                txtReceipt := '';

                CustRec.GET("Customer No.");
                txtRevStream := "Global Dimension 2 Code";
                GCustNameText := Description;

                //Check if Payment
                IF NOT ("Document Type" IN ["Document Type"::Payment,
                                            "Document Type"::Refund, "Document Type"::"Credit Memo"]) THEN
                    ERROR('The Entry must be a Payment, Refund or Credit Note!');

                FOR i := 1 TO 10 DO
                    GSettleText[i] := '';

                // ========PSALMS 11
                j := 0;
                DtldCustLedgEntry1.RESET;
                DtldCustLedgEntry1.SETCURRENTKEY("Cust. Ledger Entry No.");
                DtldCustLedgEntry1.SETRANGE("Cust. Ledger Entry No.", "Entry No.");
                DtldCustLedgEntry1.SETRANGE(Unapplied, FALSE);
                IF DtldCustLedgEntry1.FIND('-') THEN BEGIN
                    REPEAT
                        IF DtldCustLedgEntry1."Cust. Ledger Entry No." =
                          DtldCustLedgEntry1."Applied Cust. Ledger Entry No."
                        THEN BEGIN
                            DtldCustLedgEntry2.INIT;
                            DtldCustLedgEntry2.SETCURRENTKEY("Applied Cust. Ledger Entry No.", "Entry Type");
                            DtldCustLedgEntry2.SETRANGE(
                              "Applied Cust. Ledger Entry No.", DtldCustLedgEntry1."Applied Cust. Ledger Entry No.");
                            DtldCustLedgEntry2.SETRANGE("Entry Type", DtldCustLedgEntry2."Entry Type"::Application);
                            DtldCustLedgEntry2.SETRANGE(Unapplied, FALSE);
                            IF DtldCustLedgEntry2.FIND('-') THEN BEGIN
                                REPEAT
                                    IF DtldCustLedgEntry2."Cust. Ledger Entry No." <>
                                      DtldCustLedgEntry2."Applied Cust. Ledger Entry No."
                                    THEN BEGIN
                                        CustLedgEntry.SETCURRENTKEY("Entry No.");
                                        CustLedgEntry.SETRANGE("Entry No.", DtldCustLedgEntry2."Cust. Ledger Entry No.");
                                        IF CustLedgEntry.FIND('-') THEN BEGIN
                                            txtReceipt := txtReceipt + ',' + CustLedgEntry."Document No."; //MARK(TRUE);
                                            j := j + 1;
                                            IF j < 6 THEN
                                                GSettleText[1] := GSettleText[1] + ',' + CustLedgEntry."Document No."
                                            ELSE
                                                IF j < 11 THEN
                                                    GSettleText[2] := GSettleText[2] + ',' + CustLedgEntry."Document No."
                                                ELSE
                                                    IF j < 16 THEN
                                                        GSettleText[3] := GSettleText[3] + ',' + CustLedgEntry."Document No."
                                                    ELSE
                                                        IF j < 21 THEN
                                                            GSettleText[4] := GSettleText[4] + ',' + CustLedgEntry."Document No."
                                                        ELSE
                                                            IF j < 26 THEN
                                                                GSettleText[5] := GSettleText[5] + ',' + CustLedgEntry."Document No."
                                                            ELSE
                                                                IF j < 31 THEN
                                                                    GSettleText[6] := GSettleText[6] + ',' + CustLedgEntry."Document No."
                                                                ELSE
                                                                    IF j < 36 THEN
                                                                        GSettleText[7] := GSettleText[7] + ',' + CustLedgEntry."Document No."
                                                                    ELSE
                                                                        IF j < 41 THEN
                                                                            GSettleText[8] := GSettleText[8] + ',' + CustLedgEntry."Document No."
                                                                        ELSE
                                                                            IF j < 46 THEN
                                                                                GSettleText[9] := GSettleText[9] + ',' + CustLedgEntry."Document No."
                                                                            ELSE
                                                                                GSettleText[10] := GSettleText[10] + ',' + CustLedgEntry."Document No."
                                        END;
                                        txtReceipt := txtReceipt + ',' + CustLedgEntry."Document No."; //MARK(TRUE);
                                    END;
                                UNTIL DtldCustLedgEntry2.NEXT = 0;
                            END;
                        END ELSE BEGIN
                            CustLedgEntry.SETCURRENTKEY("Entry No.");
                            CustLedgEntry.SETRANGE("Entry No.", DtldCustLedgEntry1."Applied Cust. Ledger Entry No.");
                            IF CustLedgEntry.FIND('-') THEN
                                GSettleText[10] := GSettleText[10] + ',' + CustLedgEntry."Document No."; //MARK(TRUE);
                        END;
                    UNTIL DtldCustLedgEntry1.NEXT = 0;
                END;

                // ======PSALMS 11


                /*IF j < 6 THEN
                gSettleText[1] := gSettleText[1] + lCustLedEntryREC."Document No."+', ';*/

                /*
                IF STRLEN(gSettleText) > 2 THEN
                  SettleText := DELSTR(SettleText,STRLEN(SettleText) - 1);
                */
                LCustLedEntryREC.RESET;
                CALCFIELDS("Amount (LCY)");
                Amount := ABS("Amount (LCY)");
                FormatNoText(AmountText, Amount);

                IF "External Document No." <> '' THEN
                    UseCheckNo := 'Cheque No. ' + "External Document No."
                ELSE
                    UseCheckNo := '';

                CASE "Document Type" OF
                    "Document Type"::Payment, "Document Type"::Refund:
                        BEGIN
                            codeHeader := 'RECEIPT';
                            txtNotify := 'This Receipt was generated by:';
                            // IF "Payment Type" = "Payment Type"::Cash THEN //TODO: Uncomment on the live db
                            //     Receipttext := ' ';
                            // IF "Payment Type" = "Payment Type"::Cheque THEN
                            //     Receipttext := ' ';
                        END;
                    "Document Type"::"Credit Memo":
                        BEGIN
                            codeHeader := 'CREDIT NOTE';
                            txtNotify := 'This Credit Note was generated by:';
                            // IF "Credit Memo Type" = "Credit Memo Type"::Transport THEN //TODO: Uncomment on the live db
                            //     Receipttext := 'TRANSPORT REFUND';
                            // IF "Credit Memo Type" = "Credit Memo Type"::"Bank/TT" THEN
                            //     Receipttext := 'TT/BANK CHARGE REFUND';
                            // IF "Credit Memo Type" = "Credit Memo Type"::Commission THEN
                            //     Receipttext := 'COMMISSION';
                            // IF "Credit Memo Type" = "Credit Memo Type"::Swap THEN
                            //     Receipttext := 'SWAP';
                            // IF "Credit Memo Type" = "Credit Memo Type"::"Security Deposit" THEN
                            //     Receipttext := 'SECURITY DEPOSIT';
                        END;
                END;

            end;

            trigger OnPostDataItem();
            var
                LController: Integer;
            begin
                IF NOT CurrReport.PREVIEW THEN BEGIN
                    LController := 2;
                    FnPrintControl("Cust. Ledger Entry", LController);
                END;
            end;

            trigger OnPreDataItem();
            var
                LController: Integer;
            begin
                InitTextVariable;
                Company.GET;
                Company.CALCFIELDS(Company.Picture);
            end;
        }
    }

    requestpage
    {

        layout
        {
        }

        actions
        {
        }
    }

    labels
    {
    }

    trigger OnPreReport();
    begin
        Company.GET;
    end;

    var
        CustRec: Record Customer;
        GCountedAppliedDocs: Integer;
        GSettleText: array[10] of Text;
        AmountText: array[2] of Text[250];
        OnesText: array[20] of Text[30];
        TensText: array[10] of Text[30];
        ExponentText: array[5] of Text[30];
        CheckNoText: Text[30];
        CheckAmountText: Text[30];
        DescriptionLine: array[2] of Text[132];
        DocType: Text[30];
        DocNo: Text[30];
        VoidText: Text[30];
        LineAmount: Decimal;
        LineDiscount: Decimal;
        TotalLineAmount: Decimal;
        TotalLineDiscount: Decimal;
        RemainingAmount: Decimal;
        CurrentLineAmount: Decimal;
        UseCheckNo: Code[200];
        FoundLast: Boolean;
        ReprintChecks: Boolean;
        TestPrint: Boolean;
        FirstPage: Boolean;
        OneCheckPrVendor: Boolean;
        FoundNegative: Boolean;
        ApplyMethod: Option Payment,OneLineOneEntry,OneLineID,MoreLinesOneEntry;
        ChecksPrinted: Integer;
        HighestLineNo: Integer;
        PreprintedStub: Boolean;
        TotalText: Text[10];
        DocDate: Date;
        i: Integer;
        Company: Record "Company Information";
        Receipttext: Text[30];
        j: Integer;
        GCustNameText: Text[100];
        txtRevStream: Code[11];
        PrintUser: Code[20];
        codeHeader: Code[15];
        txtNotify: Text[60];
        GCopyTxt: Text[30];
        txtReceipt: Text;
        Receipt_No_CaptionLbl: Label 'Receipt No.';
        Phone_No___CaptionLbl: Label 'Phone No. :';
        Fax_No___CaptionLbl: Label 'Fax No. :';
        Rev__Stream_CaptionLbl: Label 'Rev. Stream:';
        Print_Date_CaptionLbl: Label 'Print Date:';
        Transaction_Date_CaptionLbl: Label 'Transaction Date:';
        Received_fromCaptionLbl: Label 'Received from';
        Invoice_No___s_CaptionLbl: Label 'Invoice No. (s)';
        Date__Signature_and_StampCaptionLbl: Label 'Date, Signature and Stamp';
        EmptyStringCaptionLbl: Label '________________________________________';
        Transaction_was_posted_by_CaptionLbl: Label 'Transaction was posted by:';
        Signed_CaptionLbl: Label 'Signed:';
        With_ThanksCaptionLbl: Label 'With Thanks';
        Amount_in_wordsCaptionLbl: Label 'Amount in words';

    /// <summary>
    /// FormatNoText.
    /// </summary>
    /// <param name="NoText">VAR array [2] of Text[80].</param>
    /// <param name="No">Decimal.</param>
    procedure FormatNoText(var NoText: array[2] of Text[80]; No: Decimal);
    var
        PrintExponent: Boolean;
        Ones: Integer;
        Tens: Integer;
        Hundreds: Integer;
        Exponent: Integer;
        NoTextIndex: Integer;
    begin
        CLEAR(NoText);
        NoTextIndex := 1;
        NoText[1] := '';

        IF No < 1 THEN
            AddToNoText(NoText, NoTextIndex, PrintExponent, 'ZERO')
        ELSE BEGIN
            FOR Exponent := 4 DOWNTO 1 DO BEGIN
                PrintExponent := FALSE;
                Ones := No DIV POWER(1000, Exponent - 1);
                Hundreds := Ones DIV 100;
                Tens := (Ones MOD 100) DIV 10;
                Ones := Ones MOD 10;
                IF Hundreds > 0 THEN BEGIN
                    AddToNoText(NoText, NoTextIndex, PrintExponent, OnesText[Hundreds]);
                    AddToNoText(NoText, NoTextIndex, PrintExponent, 'HUNDRED');
                END;
                IF Tens >= 2 THEN BEGIN
                    AddToNoText(NoText, NoTextIndex, PrintExponent, TensText[Tens]);
                    IF Ones > 0 THEN
                        AddToNoText(NoText, NoTextIndex, PrintExponent, OnesText[Ones]);
                END ELSE
                    IF (Tens * 10 + Ones) > 0 THEN
                        AddToNoText(NoText, NoTextIndex, PrintExponent, OnesText[Tens * 10 + Ones]);
                IF PrintExponent AND (Exponent > 1) THEN
                    AddToNoText(NoText, NoTextIndex, PrintExponent, ExponentText[Exponent]);
                No := No - (Hundreds * 100 + Tens * 10 + Ones) * POWER(1000, Exponent - 1);
            END;
        END;

        AddToNoText(NoText, NoTextIndex, PrintExponent, 'ONLY');
        //AddToNoText(NoText,NoTextIndex,PrintExponent,FORMAT(No * 100) + '/100');
    end;

    local procedure AddToNoText(var NoText: array[2] of Text[80]; var NoTextIndex: Integer; var PrintExponent: Boolean; AddText: Text[30]);
    begin
        PrintExponent := TRUE;

        WHILE STRLEN(NoText[NoTextIndex] + ' ' + AddText) > MAXSTRLEN(NoText[1]) DO BEGIN
            NoTextIndex := NoTextIndex + 1;
            IF NoTextIndex > ARRAYLEN(NoText) THEN
                ERROR('%1 results in a written number that is too long.', AddText);
        END;

        NoText[NoTextIndex] := DELCHR(NoText[NoTextIndex] + ' ' + AddText, '<');
    end;

    /// <summary>
    /// InitTextVariable.
    /// </summary>
    procedure InitTextVariable();
    begin
        OnesText[1] := 'ONE';
        OnesText[2] := 'TWO';
        OnesText[3] := 'THREE';
        OnesText[4] := 'FOUR';
        OnesText[5] := 'FIVE';
        OnesText[6] := 'SIX';
        OnesText[7] := 'SEVEN';
        OnesText[8] := 'EIGHT';
        OnesText[9] := 'NINE';
        OnesText[10] := 'TEN';
        OnesText[11] := 'ELEVEN';
        OnesText[12] := 'TWELVE';
        OnesText[13] := 'THIRTEEN';
        OnesText[14] := 'FOURTEEN';
        OnesText[15] := 'FIFTEEN';
        OnesText[16] := 'SIXTEEN';
        OnesText[17] := 'SEVENTEEN';
        OnesText[18] := 'EIGHTEEN';
        OnesText[19] := 'NINETEEN';

        TensText[1] := '';
        TensText[2] := 'TWENTY';
        TensText[3] := 'THIRTY';
        TensText[4] := 'FORTY';
        TensText[5] := 'FIFTY';
        TensText[6] := 'SIXTY';
        TensText[7] := 'SEVENTY';
        TensText[8] := 'EIGHTY';
        TensText[9] := 'NINETY';

        ExponentText[1] := '';
        ExponentText[2] := 'THOUSAND';
        ExponentText[3] := 'MILLION';
        ExponentText[4] := 'BILLION';
    end;

    /// <summary>
    /// FnPrintControl.
    /// </summary>
    /// <param name="PCustLedEntryREC">VAR Record "Cust. Ledger Entry".</param>
    /// <param name="PController">VAR Integer.</param>
    procedure FnPrintControl(var PCustLedEntryREC: Record "Cust. Ledger Entry"; var PController: Integer);
    var
        LDocContrREC: Record "Journal Based Doc. Print Contr";
    begin
        WITH PCustLedEntryREC DO
            CASE PController OF
                1:
                    BEGIN
                        GCopyTxt := '';
                        LDocContrREC.INIT;
                        IF LDocContrREC.GET(DATABASE::"Cust. Ledger Entry", "Entry No.") THEN
                            GCopyTxt := 'COPY ' + FORMAT(LDocContrREC."No. Printed");
                    END;
                2:
                    BEGIN
                        LDocContrREC.INIT;
                        IF NOT LDocContrREC.GET(DATABASE::"Cust. Ledger Entry", "Entry No.") THEN BEGIN
                            LDocContrREC."Table ID" := DATABASE::"Cust. Ledger Entry";
                            LDocContrREC."Entry No" := "Entry No.";
                            LDocContrREC."Account Type" := LDocContrREC."Account Type"::Customer;
                            LDocContrREC."Account No." := "Customer No.";
                            LDocContrREC."Posting Date" := "Posting Date";
                            LDocContrREC."Document Type" := "Document Type";
                            LDocContrREC."Document No" := "Document No.";
                            LDocContrREC."No. Printed" := LDocContrREC."No. Printed" + 1;
                            LDocContrREC."Last Date Printed" := CURRENTDATETIME;
                            LDocContrREC."Last Print By" := USERID;
                            LDocContrREC.INSERT;
                            COMMIT;
                        END
                        ELSE BEGIN
                            IF LDocContrREC."Account Type" <> LDocContrREC."Account Type"::Customer THEN
                                LDocContrREC."Account Type" := LDocContrREC."Account Type"::Customer;
                            IF LDocContrREC."Account No." <> "Customer No." THEN
                                LDocContrREC."Account No." := "Customer No.";
                            IF LDocContrREC."Posting Date" <> "Posting Date" THEN
                                LDocContrREC."Posting Date" := "Posting Date";
                            IF LDocContrREC."Document Type" <> "Document Type" THEN
                                LDocContrREC."Document Type" := "Document Type";
                            IF LDocContrREC."Document No" <> "Document No." THEN
                                LDocContrREC."Document No" := "Document No.";

                            LDocContrREC."No. Printed" := LDocContrREC."No. Printed" + 1;
                            LDocContrREC."Last Date Printed" := CURRENTDATETIME;
                            LDocContrREC."Last Print By" := USERID;
                            LDocContrREC.MODIFY;
                            COMMIT;
                        END;
                    END;
            END
    end;
}

