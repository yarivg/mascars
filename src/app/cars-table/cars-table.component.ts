import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MdbTableDirective} from 'angular-bootstrap-md';
import {ColorPresentation} from '../ColorPresentation';
import {Car} from '../entities/car';
import {CarsService} from '../services/cars.service';
import {v4 as uuidv4} from 'uuid';
import {ColorOptionCode} from '../entities/color-option-code';

@Component({
  selector: 'app-cars-table',
  templateUrl: './cars-table.component.html',
  styleUrls: ['./cars-table.component.scss']
})
export class CarsTableComponent implements OnInit {
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  filteredElements: Car[] = [];
  elements: Car[] = [];
  headElements = [
    'מספר רכב',
    'סוג רכב',
    'צבע',
    'שם',
    'פעולות'
  ];
  colorPresentation = ColorPresentation;
  searchText = '';
  text: string;
  serial = '';
  carType = '';
  carColor = '';
  name = '';
  colorOptions: ColorOptionCode[] = [];

  constructor(private carsService: CarsService) {
  }

  @HostListener('input') oninput(): void {
    this.searchItems();
  }

  ngOnInit(): void {
    this.carsService.getCars().subscribe((value: Car[]) => {
      this.elements = value;
      this.initNoDashSerials();
      this.elements.sort((a, b) => Number(a.carSerialWithNoDashes) - Number(b.carSerialWithNoDashes));
      this.searchItems();
    });

    this.mdbTable.setDataSource(this.elements);
    this.initColorOptions();
  }

  searchItems(): void {
    this.mdbTable.setDataSource(this.elements);

    if (!this.searchText) {
      this.filteredElements = this.mdbTable.getDataSource();
    } else {
      this.filteredElements = this.mdbTable.searchLocalDataByMultipleFields(this.searchText,
        ['name', 'carSerial', 'carType', 'carSerialWithNoDashes']);
    }
  }

  deleteCar(car: Car): void {
    if (confirm('האם למחוק את הרכב של ' + car.name + '?')) {
      this.carsService.removeCar(car.id).subscribe();
    }
  }

  addCar(): void {
    if (this.validateNewCarInsert()) {
      const newCar: Car = {
        id: uuidv4(), carType: this.carType, carSerial: this.serial,
        name: this.name, color: this.carColor
      };

      this.initInputs();
      this.carsService.addCar(newCar).subscribe();
    }
  }

  private initInputs(): void {
    this.carType = '';
    this.serial = '';
    this.name = '';
    this.carColor = '';
  }

  private initNoDashSerials(): void {
    this.elements.forEach(elem => {
      elem.carSerialWithNoDashes = elem.carSerial.split('-').join('');
    });
  }

  private initColorOptions(): void {
    Object.keys(ColorPresentation).forEach(key => {
      this.colorOptions.push({
        colorKey: key,
        colorOption: {
          text: ColorPresentation[key].text,
          rgb: ColorPresentation[key].rgb
        }
      });
    });
  }

  clearSearch(): void {
    this.searchText = '';
    this.searchItems();
  }

  validateNewCarInsert(): boolean {
    return this.carType.trim().length > 0 && this.carColor.length > 0 &&
      this.serial.trim().length > 0 && this.name.trim().length > 0;
  }
}
