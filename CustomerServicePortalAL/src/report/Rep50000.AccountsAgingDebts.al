report 50000 "Accounts Aging - Debts"
{

    DefaultLayout = RDLC;
    RDLCLayout = './Accounts Aging Debts.rdl';
    Caption = 'Accounts Aging - Debts';
    ApplicationArea = All;
    UsageCategory = ReportsAndAnalysis;

    dataset
    {
        dataitem(Customer; Customer)
        {
            RequestFilterFields = "No.", "Customer Posting Group", "Global Dimension 2 Filter";
            column(ThreeMonthAbove; ThreeMonthAbove) { }
            column(over90DaysDateRange_1; over90DaysDateRange[1]) { }
            column(TotalAmountOver90; TotalAmountOver90) { }
            column(TotalAmountOver90LCY; TotalAmountOver90LCY) { }
            column(gvDateRange_1_; gvDateRange[1])
            {
            }
            column(gvDateRange_1_1; gvDateRange[1] + 1)
            {
            }
            column(gvDateRange_2_; gvDateRange[2])
            {
            }
            column(FORMAT_gvDateRange_2__1_; gvDateRange[2] + 1)
            {
            }
            column(FORMAT_gvDateRange_3__1_; gvDateRange[3] + 1)
            {
            }
            column(gvDateRange_3_; gvDateRange[3])
            {
            }
            column(FORMAT_gvDateRange_7__; gvDateRange[7])
            {
            }
            column(gFilterstxt; gFilterstxt)
            {
            }
            column(gCompanyInfo_Name; gCompanyInfo.Name)
            {
            }
            column(CurrReport_PAGENO; CurrReport.PAGENO)
            {
            }
            column(gvDateRange_1__Control1000000091; gvDateRange[1])
            {
            }
            column(InvoicesOnly; InvoicesOnly)
            {
            }
            column(CustBalanceDueLCY_1__Control26CaptionLbl; CustBalanceDueLCY_1__Control26CaptionLbl)
            {
            }
            column(CustBalanceDueLCY_2__Control27CaptionLbl; CustBalanceDueLCY_2__Control27CaptionLbl)
            {
            }
            column(CustBalanceDueLCY_3__Control28CaptionLbl; CustBalanceDueLCY_3__Control28CaptionLbl)
            {
            }
            column(gvAgedBalancesLCY_6_; gvAgedBalancesLCY[6])
            {
            }
            column(gvAgedBalancesLCY_7_; gvAgedBalancesLCY[7])
            {
            }
            column(gvAgedBalancesLCY_5_; gvAgedBalancesLCY[5])
            {
            }
            column(gvAgedBalancesLCY_4_; gvAgedBalancesLCY[4])
            {
            }
            column(gvAgedBalancesLCY_3_; gvAgedBalancesLCY[3])
            {
            }
            column(gvAgedBalancesLCY_2_; gvAgedBalancesLCY[2])
            {
            }
            column(gvAgedBalancesLCY_1_; gvAgedBalancesLCY[1])
            {
            }
            column(gvBalanceToDateLCY; gvBalanceToDateLCY)
            {
            }
            column(UnAppliedLCY; UnAppliedLCY)
            {
            }
            column(gvAgedBalancesLCY_6__Control1000000054; gvAgedBalancesLCY[6])
            {
            }
            column(gvAgedBalancesLCY_7__Control1000000054; gvAgedBalancesLCY[7])
            {
            }
            column(gvAgedBalancesLCY_5__Control1000000054; gvAgedBalancesLCY[5])
            {
            }
            column(gvAgedBalancesLCY_4__Control1000000055; gvAgedBalancesLCY[4])
            {
            }
            column(gvAgedBalancesLCY_3__Control1000000056; gvAgedBalancesLCY[3])
            {
            }
            column(gvAgedBalancesLCY_2__Control1000000057; gvAgedBalancesLCY[2])
            {
            }
            column(gvAgedBalancesLCY_1__Control1000000058; gvAgedBalancesLCY[1])
            {
            }
            column(gvBalanceToDateLCY_Control1000000053; gvBalanceToDateLCY)
            {
            }
            column(UnAppliedLCY_Control1000000089; UnAppliedLCY)
            {
            }
            column(Customer__No__; "No.")
            {
            }
            column(Customer_Name; Name)
            {
            }
            column(gvAgedBalancesLCY_6__Control1000000012; gvAgedBalancesLCY[6])
            {
            }
            column(gvAgedBalancesLCY_7__Control1000000012; gvAgedBalancesLCY[7])
            {
            }
            column(gvAgedBalancesLCY_5__Control1000000011; gvAgedBalancesLCY[5])
            {
            }
            column(gvAgedBalancesLCY_4__Control1000000012; gvAgedBalancesLCY[4])
            {
            }
            column(gvAgedBalancesLCY_3__Control1000000013; gvAgedBalancesLCY[3])
            {
            }
            column(gvAgedBalancesLCY_2__Control1000000014; gvAgedBalancesLCY[2])
            {
            }
            column(gvAgedBalancesLCY_1__Control1000000015; gvAgedBalancesLCY[1])
            {
            }
            column(gvBalanceToDateLCY_Control1000000042; gvBalanceToDateLCY)
            {
            }
            column(gvCustLedgerEntry__Currency_Code_; gvCustLedgerEntry."Currency Code")
            {
            }
            column(UnAppliedLCY_Control1000000082; UnAppliedLCY)
            {
            }
            column(gvAgedBalancesLCY_1__Control1000000059; gvAgedBalancesLCY[1])
            {
            }
            column(gvAgedBalancesLCY_6__Control1000000060; gvAgedBalancesLCY[6])
            {
            }
            column(gvAgedBalancesLCY_7__Control1000000060; gvAgedBalancesLCY[7])
            {
            }
            column(gvAgedBalancesLCY_5__Control1000000060; gvAgedBalancesLCY[5])
            {
            }
            column(gvAgedBalancesLCY_4__Control1000000061; gvAgedBalancesLCY[4])
            {
            }
            column(gvAgedBalancesLCY_3__Control1000000062; gvAgedBalancesLCY[3])
            {
            }
            column(gvAgedBalancesLCY_2__Control1000000063; gvAgedBalancesLCY[2])
            {
            }
            column(Customer_Name_Control1000000076; Name)
            {
            }
            column(Customer__No___Control1000000077; "No.")
            {
            }
            column(gvBalanceToDateLCY_Control1000000052; gvBalanceToDateLCY)
            {
            }
            column(UnAppliedLCY_Control1000000083; UnAppliedLCY)
            {
            }
            column(gvAgedBalancesLCY_5__Control1000000030; gvAgedBalancesLCY[5])
            {
            }
            column(gvAgedBalancesLCY_4__Control1000000031; gvAgedBalancesLCY[4])
            {
            }
            column(gvAgedBalancesLCY_3__Control1000000032; gvAgedBalancesLCY[3])
            {
            }
            column(gvAgedBalancesLCY_2__Control1000000033; gvAgedBalancesLCY[2])
            {
            }
            column(gvAgedBalancesLCY_1__Control1000000034; gvAgedBalancesLCY[1])
            {
            }
            column(gvBalanceToDateLCY_Control1000000043; gvBalanceToDateLCY)
            {
            }
            column(UnAppliedLCY_Control1000000084; UnAppliedLCY)
            {
            }
            column(gvAgedBalancesLCY_1__Control1000000064; gvAgedBalancesLCY[1])
            {
            }
            column(gvAgedBalancesLCY_5__Control1000000065; gvAgedBalancesLCY[5])
            {
            }
            column(gvAgedBalancesLCY_4__Control1000000066; gvAgedBalancesLCY[4])
            {
            }
            column(gvAgedBalancesLCY_3__Control1000000067; gvAgedBalancesLCY[3])
            {
            }
            column(gvAgedBalancesLCY_2__Control1000000068; gvAgedBalancesLCY[2])
            {
            }
            column(gvBalanceToDateLCY_Control1000000080; gvBalanceToDateLCY)
            {
            }
            column(UnAppliedLCY_Control1000000086; UnAppliedLCY)
            {
            }
            column(gvAgedBalancesLCY_5__Control1000000036; gvAgedBalancesLCY[5])
            {
            }
            column(gvAgedBalancesLCY_4__Control1000000037; gvAgedBalancesLCY[4])
            {
            }
            column(gvAgedBalancesLCY_3__Control1000000038; gvAgedBalancesLCY[3])
            {
            }
            column(gvAgedBalancesLCY_2__Control1000000039; gvAgedBalancesLCY[2])
            {
            }
            column(gvAgedBalancesLCY_1__Control1000000040; gvAgedBalancesLCY[1])
            {
            }
            column(gvBalanceToDateLCY_Control1000000044; gvBalanceToDateLCY)
            {
            }
            column(UnAppliedLCY_Control1000000085; UnAppliedLCY)
            {
            }
            column(gvAgedBalancesLCY_1__Control1000000069; gvAgedBalancesLCY[1])
            {
            }
            column(gvAgedBalancesLCY_5__Control1000000070; gvAgedBalancesLCY[5])
            {
            }
            column(gvAgedBalancesLCY_4__Control1000000071; gvAgedBalancesLCY[4])
            {
            }
            column(gvAgedBalancesLCY_3__Control1000000072; gvAgedBalancesLCY[3])
            {
            }
            column(gvAgedBalancesLCY_2__Control1000000073; gvAgedBalancesLCY[2])
            {
            }
            column(gvBalanceToDateLCY_Control1000000081; gvBalanceToDateLCY)
            {
            }
            column(UnAppliedLCY_Control1000000087; UnAppliedLCY)
            {
            }
            column(Customer_No_Caption; Customer_No_CaptionLbl)
            {
            }
            column(Customer_NameCaption; Customer_NameCaptionLbl)
            {
            }
            column(V0___30DAYSCaption; V0___30DAYSCaptionLbl)
            {
            }
            column(V30_60_DAYSCaption; V30_60_DAYSCaptionLbl)
            {
            }
            column(V60DAYS___1YEARCaption; V60DAYS___1YEARCaptionLbl)
            {
            }
            column(V1___2_YEARSCaption; V1___2_YEARSCaptionLbl)
            {
            }
            column(V2_YEARSCaption; V2_YEARSCaptionLbl)
            {
            }
            column(Balance_Caption; Balance_CaptionLbl)
            {
            }
            column(PageCaption; PageCaptionLbl)
            {
            }
            column(Accounts_Aged_ReportCaption; Accounts_Aged_ReportCaptionLbl)
            {
            }
            column(UnApplied_Docs_Caption; UnApplied_Docs_CaptionLbl)
            {
            }
            column(Ref__Date_Caption; Ref__Date_CaptionLbl)
            {
            }
            column(Invoices_Only_Caption; Invoices_Only_CaptionLbl)
            {
            }
            column(Continued__________________________________________________________________________________________________Caption; Continued__________________________________________________________________________________________________CaptionLbl)
            {
            }
            column(DataItem1000000079; Continued__________________________________________________________________________________________Caption_Control100Lbl)
            {
            }
            column(Sub_TotalCaption; Sub_TotalCaptionLbl)
            {
            }
            column(Sub_TotalCaption_Control1000000075; Sub_TotalCaption_Control1000000075Lbl)
            {
            }
            column(Grand_TotalCaption; Grand_TotalCaptionLbl)
            {
            }
            column(Grand_TotalCaption_Control1000000074; Grand_TotalCaption_Control1000000074Lbl)
            {
            }

            trigger OnAfterGetRecord();
            begin
                CLEAR(gvAgedBalances);
                CLEAR(UnApplied);
                CLEAR(UnAppliedLCY);
                CLEAR(gvAgedBalancesLCY);

                // IF InvoicesOnly = TRUE THEN BEGIN
                gvCustLedgerEntry.RESET;
                gvCustLedgerEntry.SETCURRENTKEY("Customer No.", "Document Type", "Posting Date", "Document No.", "Global Dimension 2 Code");
                gvCustLedgerEntry.SETRANGE("Customer No.", "No.");
                gvCustLedgerEntry.SETFILTER("Document Type", '<>%1', gvCustLedgerEntry."Document Type"::Invoice);
                gvCustLedgerEntry.SETRANGE("Posting Date", 0D, gvDateRange[1]);
                IF gvRevenueStream <> '' THEN
                    gvCustLedgerEntry.SETRANGE("Global Dimension 2 Code", gvRevenueStream);//
                IF gvCustLedgerEntry.FINDFIRST THEN
                    REPEAT
                        gvCustLedgerEntry.CALCFIELDS("Remaining Amount", "Remaining Amt. (LCY)");
                        ApplnEntriesDtldtLedgEntry(gvCustLedgerEntry);
                        UnApplied := UnApplied + gvCustLedgerEntry."Remaining Amount" - PostAppliedAmount;
                        UnAppliedLCY := UnAppliedLCY + gvCustLedgerEntry."Remaining Amt. (LCY)";
                    UNTIL gvCustLedgerEntry.NEXT = 0;

                IF InvoicesOnly = false THEN BEGIN
                    gvCustLedgerEntry.RESET;
                    gvCustLedgerEntry.SETCURRENTKEY("Customer No.", "Document Type", "Posting Date", "Document No.", "Global Dimension 2 Code");
                    gvCustLedgerEntry.SETRANGE("Customer No.", "No.");
                    IF gvCustLedgerEntry.FINDSET THEN
                        REPEAT
                            gvCustLedgerEntry.CALCFIELDS("Remaining Amount", "Amount (LCY)", "Remaining Amt. (LCY)");
                            IF gvCustLedgerEntry."Posting Date" IN [0D .. over90DaysDateRange[1]] THEN BEGIN
                                ApplnEntriesDtldtLedgEntry(gvCustLedgerEntry);
                                gvAgedBalances[1] := gvAgedBalances[1] + gvCustLedgerEntry."Remaining Amount" - PostAppliedAmount;
                                gvAgedBalancesLCY[1] := gvAgedBalancesLCY[1] + gvCustLedgerEntry."Remaining Amt. (LCY)" - PostAppliedAmountLCY;
                            END;
                        UNTIL gvCustLedgerEntry.NEXT = 0;

                    gvCustLedgerEntry.RESET;
                    gvCustLedgerEntry.SETCURRENTKEY("Customer No.", "Document Type", "Posting Date", "Document No.", "Global Dimension 2 Code");
                    gvCustLedgerEntry.SETRANGE("Customer No.", "No.");
                    gvCustLedgerEntry.SetFilter("Document Type", '%1|%2', gvCustLedgerEntry."Document Type"::Payment, gvCustLedgerEntry."Document Type"::Refund);
                    IF gvCustLedgerEntry.FINDSET THEN
                        REPEAT
                            gvCustLedgerEntry.CalcFields(Amount, "Amount (LCY)");
                            IF gvCustLedgerEntry."Posting Date" IN [(gvDateRange[1] + 1) .. gvDateRange[2]] THEN BEGIN
                                ApplnEntriesDtldtLedgEntry(gvCustLedgerEntry);
                                gvAgedBalances[2] := gvAgedBalances[2] + gvCustLedgerEntry.Amount;
                                gvAgedBalancesLCY[2] := gvAgedBalancesLCY[2] + gvCustLedgerEntry."Amount (LCY)";
                            END;
                            IF gvCustLedgerEntry."Posting Date" IN [(gvDateRange[2] + 1) .. gvDateRange[3]] THEN BEGIN
                                ApplnEntriesDtldtLedgEntry(gvCustLedgerEntry);
                                gvAgedBalances[3] := gvAgedBalances[3] + gvCustLedgerEntry.Amount;
                                gvAgedBalancesLCY[3] := gvAgedBalancesLCY[3] + gvCustLedgerEntry."Amount (LCY)";
                            END;
                        until gvCustLedgerEntry.Next() = 0;

                    gvCustLedgerEntry.RESET;
                    gvCustLedgerEntry.SETCURRENTKEY("Customer No.", "Document Type", "Posting Date", "Document No.", "Global Dimension 2 Code");
                    gvCustLedgerEntry.SETRANGE("Customer No.", "No.");
                    gvCustLedgerEntry.SetFilter("Document Type", '%1|%2', gvCustLedgerEntry."Document Type"::Payment, gvCustLedgerEntry."Document Type"::Refund);
                    gvCustLedgerEntry.SetFilter("Posting Date", '%1..', (gvDateRange[3] + 1));
                    IF gvCustLedgerEntry.FINDSET THEN
                        REPEAT
                            gvCustLedgerEntry.CalcFields(Amount, "Amount (LCY)");
                            ApplnEntriesDtldtLedgEntry(gvCustLedgerEntry);
                            gvAgedBalances[4] := gvAgedBalances[4] + gvCustLedgerEntry.Amount;
                            gvAgedBalancesLCY[4] := gvAgedBalancesLCY[4] + gvCustLedgerEntry."Amount (LCY)";
                        until gvCustLedgerEntry.Next() = 0;
                END;
            end;

            trigger OnPreDataItem();
            begin
                gFilterstxt := Customer.GETFILTERS;
            end;
        }
    }

    requestpage
    {

        layout
        {
            area(content)
            {

                group(Option)
                {
                    Caption = 'Option';
                    field(gvDateRange; gvDateRange[1])
                    {
                        Caption = 'Age As at (Date)';
                    }
                    field(gvBooleanLCY; gvBooleanLCY)
                    {
                        Caption = 'Print Amount in LCY';
                    }
                }
            }
        }

        actions
        {
        }
    }

    labels
    {
    }

    trigger OnInitReport();
    begin
        CLEAR(gvRevenueStream);
        CLEAR(gvBalanceToDateLCY);
    end;

    trigger OnPreReport();
    begin
        CalcDates;
        gvRevenueStream := Customer.GETFILTER("Global Dimension 2 Filter");
    end;

    var
        gvDateRange: array[7] of Date;
        over90DaysDateRange: array[2] of Date;
        paymentDateRange: array[7] of Date;
        gvCustLedgerEntry: Record "Cust. Ledger Entry";
        gvDetCustLedger: Record "Detailed Cust. Ledg. Entry";
        X: Integer;
        gvAgedBalances: array[10] of Decimal;
        gvAgedBalancesLCY: array[10] of Decimal;
        gvBalanceToDate: Decimal;
        gvBalanceToDateLCY: Decimal;
        gFilterstxt: Text[100];
        gCompanyInfo: Record "Company Information";
        gvBooleanLCY: Boolean;
        UnApplied: Decimal;
        UnAppliedLCY: Decimal;
        InvoicesOnly: Boolean;
        CreateCustLedgEntry: Record "Cust. Ledger Entry";
        Heading: Text[50];
        PostAppliedAmount: Decimal;
        PostAppliedAmountLCY: Decimal;
        tot1: Decimal;
        tot2: Decimal;
        DetCustLedger: Record "Detailed Cust. Ledg. Entry";
        X1: Decimal;
        X2: Decimal;
        gvRevenueStream: Text[50];
        Customer_No_CaptionLbl: Label 'Customer No.';
        Customer_NameCaptionLbl: Label 'Customer Name';
        V0___30DAYSCaptionLbl: Label '0 - 30DAYS';
        V30_60_DAYSCaptionLbl: Label '30-60 DAYS';
        V60DAYS___1YEARCaptionLbl: Label '60DAYS - 1YEAR';
        V1___2_YEARSCaptionLbl: Label '1 - 2 YEARS';
        V2_YEARSCaptionLbl: Label '> 2 YEARS';
        Balance_CaptionLbl: Label '"Balance "';
        PageCaptionLbl: Label 'Page';
        Accounts_Aged_ReportCaptionLbl: Label 'Accounts Aged Expanded Report';
        UnApplied_Docs_CaptionLbl: Label 'UnApplied Docs.';
        Ref__Date_CaptionLbl: Label 'Ref. Date:';
        Invoices_Only_CaptionLbl: Label 'Invoices Only:';
        Continued__________________________________________________________________________________________________CaptionLbl: Label 'Continued..................................................................................................';
        Continued__________________________________________________________________________________________Caption_Control100Lbl: Label 'Continued..................................................................................................';
        Sub_TotalCaptionLbl: Label 'Sub-Total';
        Sub_TotalCaption_Control1000000075Lbl: Label 'Sub-Total';
        Grand_TotalCaptionLbl: Label 'Grand-Total';
        Grand_TotalCaption_Control1000000074Lbl: Label 'Grand-Total';
        CustBalanceDueLCY_1__Control26CaptionLbl: Label '0-90 days';
        CustBalanceDueLCY_2__Control27CaptionLbl: Label '90-1Year days';
        CustBalanceDueLCY_3__Control28CaptionLbl: Label '> 1Year days';
        ThreeMonthAbove: Label '>3M';
        i: Integer;
        PeriodStartDate: array[9] of Date;
        TotalAmountOver90: Decimal;
        TotalAmountOver90LCY: Decimal;

    /// <summary>
    /// CalcDates.
    /// </summary>
    procedure CalcDates();
    begin
        //  gvDateRange[2] := CALCDATE('-1M',gvDateRange[1]);
        //  gvDateRange[3] := CALCDATE('-2M',gvDateRange[2]);
        //  gvDateRange[4] := CALCDATE('-3M',gvDateRange[3]);
        //  gvDateRange[5] := CALCDATE('-4Y',gvDateRange[4]);

        // gvDateRange[2] := CALCDATE('-1M', gvDateRange[1]);
        // gvDateRange[3] := CALCDATE('-2M', gvDateRange[2]);
        // gvDateRange[4] := CALCDATE('-2M', gvDateRange[3]);
        // gvDateRange[5] := CALCDATE('-3M', gvDateRange[4]);
        // gvDateRange[6] := CALCDATE('-125D', gvDateRange[5]);
        // gvDateRange[7] := CalcDate('-1Y', gvDateRange[6]);
        over90DaysDateRange[1] := CalcDate('-3M', gvDateRange[1]);
        gvDateRange[2] := CalcDate('+3M', gvDateRange[1]);
        gvDateRange[3] := CalcDate('+9m', gvDateRange[2]);
    end;

    /// <summary>
    /// FindApplnEntriesDtldtLedgEntry.
    /// </summary>
    /// <param name="varCustLedger">Record "21".</param>
    procedure FindApplnEntriesDtldtLedgEntry(varCustLedger: Record "Cust. Ledger Entry");
    var
        DtldCustLedgEntry1: Record "Detailed Cust. Ledg. Entry";
        DtldCustLedgEntry2: Record "Detailed Cust. Ledg. Entry";
        varCustLedger1: Record "Cust. Ledger Entry";
    begin
    end;

    /// <summary>
    /// ApplnEntriesDtldtLedgEntry.
    /// </summary>
    /// <param name="varCustLedger">Record "Cust. Ledger Entry".</param>
    procedure ApplnEntriesDtldtLedgEntry(varCustLedger: Record "Cust. Ledger Entry");
    var
        DtldCustLedgEntry1: Record "Detailed Cust. Ledg. Entry";
        DtldCustLedgEntry2: Record "Detailed Cust. Ledg. Entry";
        varCustLedger1: Record "Cust. Ledger Entry";
    begin

        PostAppliedAmount := 0;
        PostAppliedAmountLCY := 0;
        DtldCustLedgEntry1.SETCURRENTKEY("Cust. Ledger Entry No.");
        DtldCustLedgEntry1.SETRANGE("Cust. Ledger Entry No.", varCustLedger."Entry No.");
        DtldCustLedgEntry1.SETRANGE("Entry Type", DtldCustLedgEntry2."Entry Type"::Application);
        DtldCustLedgEntry1.SETRANGE(Unapplied, FALSE);
        DtldCustLedgEntry1.SETFILTER("Posting Date", '>%1', gvDateRange[1]);
        IF DtldCustLedgEntry1.FIND('-') THEN
            REPEAT
                PostAppliedAmount := PostAppliedAmount + DtldCustLedgEntry1.Amount;
                PostAppliedAmountLCY := PostAppliedAmountLCY + DtldCustLedgEntry1."Amount (LCY)";
            UNTIL DtldCustLedgEntry1.NEXT = 0;
    end;
}
