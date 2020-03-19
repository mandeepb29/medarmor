import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-genome-data',
  templateUrl: './genome-data.component.html',
  styleUrls: ['./genome-data.component.scss']
})
export class GenomeDataComponent implements OnInit {

  csvContent: string;
  table_data;
  constructor() { }

  ngOnInit(): void {
  }

  onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;
    let data = this.csvContent.split(/\r?\n|\r/);


    this.table_data = '<table class="table table-bordered">'
    console.log(data.length)
    for (let count=0; count < data.length; count++) {
      var cell_data = data[count].split(",");
      this.table_data += `<tr>`
      for (var cell_count = 0; cell_count< cell_data.length;cell_count++){
        if(count === 0){
          // console.log(cell_data[cell_count]);
          this.table_data += `<th> ${cell_data[cell_count]} </th>`
        }else{
          this.table_data += `<td> ${cell_data[cell_count]} </td>`
        }
      }
      this.table_data += `</tr>`
    }
    this.table_data += '</table>'
    this.table_data;
    $('#tablessss').html(this.table_data);
  }

  onFileSelect(input: HTMLInputElement) {

    const files = input.files;
    var content = this.csvContent;

   if (files && files.length) {

        console.log("Filename: " + files[0].name);
        console.log("Type: " + files[0].type);
        console.log("Size: " + files[0].size + " bytes");


        const fileToRead = files[0];

        const fileReader = new FileReader();
        fileReader.onload = this.onFileLoad;

        fileReader.readAsText(fileToRead);
        console.log(this.table_data,'file')
   }

  }

}
