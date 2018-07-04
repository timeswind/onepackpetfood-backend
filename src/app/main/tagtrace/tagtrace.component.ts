import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MAT_BOTTOM_SHEET_DATA, MatTableDataSource, MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { TagtraceApiService } from '../../services/tagtrace.api.service';
import { first, filter } from 'rxjs/operators';
export interface TagtrackScheme {
    name: string;
    code: string;
    type: string;
    active: boolean;
    active_date: Date;
    created_at: Date;
    _id: string;
}

// name: { type: String, required: true },
// code: { type: String, required: true },
// type: { type: String, required: true },
// active: { type: Boolean, require: true, default: false },
// active_date: { type: Date },
// created_at: { type: Date, default: Date.now }

// import { locale as english } from './i18n/en';
// import { locale as turkish } from './i18n/tr';

@Component({
    selector: 'tagtrace',
    templateUrl: './tagtrace.component.html',
    styleUrls: ['./tagtrace.component.scss']
})

export class TagtraceComponent {
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    // constructor(
    //     private _fuseTranslationLoaderService: FuseTranslationLoaderService
    // )
    // {
    //     this._fuseTranslationLoaderService.loadTranslations(english, turkish);
    // }
    dataSource: any;
    constructor(public dialog: MatDialog, private tagTraceApiService: TagtraceApiService, private router: Router, private bottomSheet: MatBottomSheet) {
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd && e.url === '/tagtrace'))
            .subscribe(e => {
                this.fetchTagtracks();
            });
    }

    // ngOnInit(): void {

    // }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    rowClick(row: any): void {
        this.bottomSheet.open(BottomSheetOverviewExampleSheet, { data: row });
    }

    fetchTagtracks(): void {
        this.tagTraceApiService.getAllTagrack()
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data)
                    this.dataSource = new MatTableDataSource(data.records);
                },
                error => {
                    // this.loading = false;
                });
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '250px',
            data: { name: "", type: 'pack', count: 1, packageCode: "插画1" }
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('The dialog was closed', result);
            if (result) {
                this.tagTraceApiService.newTagtrack(result)
                .pipe(first())
                .subscribe(
                    data => {
                        // console.log(data)
                        this.fetchTagtracks();
                    },
                    error => {
                        // this.loading = false;
                    });
            }
        });
    }

    displayedColumns: string[] = ['name', 'code', 'type', 'active', 'active_date', 'created_at'];
}

export interface NewTagtrackScheme {
    name: string;
    type: string;
    count: number;
}


@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
    packageCodes = ['插画1', '插画2']

    constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: TagtrackScheme
    ) {
        console.log(this.data)
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}


@Component({
    selector: 'bottom-sheet-overview-example-sheet',
    templateUrl: 'bottom-sheet-overview-example-sheet.html',
})
export class BottomSheetOverviewExampleSheet {
    tagtrackData: any;
    constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private tagTraceApiService: TagtraceApiService) {
        this.tagtrackData = data
    }

    updateTagtrace(): void {
        this.tagTraceApiService.updateTagtrack(this.tagtrackData)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data)
                    this.bottomSheetRef.dismiss();
                    // this.fetchTagtracks();
                },
                error => {
                    // this.loading = false;
                });
    }
}