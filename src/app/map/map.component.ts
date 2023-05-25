import { AfterViewInit, ChangeDetectorRef, Component } from "@angular/core";
import { DataService, MapEntry } from "../service/DataService.service";
import { FormControl } from "@angular/forms";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    //stylesUrls: ['./map.conponent.css']
    styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
    bbox: any;
    bboxWidth: any;
    bboxHeight: any;
    x: any;
    y: any;
    viewBox: string;
    mapEntries: MapEntry[] = [];
    isHovering = false;
    selectedCity: string = null;
    searchControl = new FormControl('');

    constructor(
        private dataSvc: DataService,
        private cdr: ChangeDetectorRef) {
        this.mapEntries = this.dataSvc.getData();
    }

    ngAfterViewInit(): void {
        this.bbox = document.querySelector('svg').getBBox();
        this.bboxWidth = this.bbox.width;
        this.bboxHeight = this.bbox.height;
        this.x = this.bbox.x;
        this.y = this.bbox.y;
        this.viewBox = `${this.x} ${this.y} ${this.bboxWidth} ${this.bboxHeight}`;
        this.cdr.detectChanges();
    }

    onClick(data: MapEntry, event: any) {
        console.log("event : ", event);
        this.isHovering = true;
        this.selectedCity = data.title;
    }

    isSelected(data: MapEntry) {
        return this.selectedCity === data.title;
    }

    onCityChanged(newCityName: string) {
        this.selectedCity = newCityName;
    }
}