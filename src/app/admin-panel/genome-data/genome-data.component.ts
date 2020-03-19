import { Component, OnInit } from "@angular/core";
declare var $: any;

@Component({
  selector: "app-genome-data",
  templateUrl: "./genome-data.component.html",
  styleUrls: ["./genome-data.component.scss"]
})
export class GenomeDataComponent implements OnInit {
  csvContent: string;
  table_data;
  json_format;
  constructor() {}

  ngOnInit(): void {}

  onFileLoad(fileLoadedEvent) {
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;
    console.log(this.csvContent);
    let data = this.csvContent.split(/\r?\n|\r/);
    let column_array = [];
    let object_array = [];

    this.table_data = '<table class="table table-bordered">';
    // console.log(data)
    let abc = data[0].split(",");
    // console.log(abc,'abcccc')
    for (let count = 0; count < data.length; count++) {
      var cell_data = data[count].split(",");
      this.table_data += `<tr>`;
      for (var cell_count = 0; cell_count < cell_data.length; cell_count++) {
        if (count == 0) {
          this.table_data += `<th> ${cell_data[cell_count]} </th>`;
          column_array[cell_count] = new Array();
        } else {
          this.table_data += `<td> ${cell_data[cell_count]} </td>`;
          column_array[cell_count].push(cell_data[cell_count]);
          console.log(column_array[cell_count])
          let obj = {
            key: abc[cell_count],
            value: column_array[cell_count]
          };
          console.log(obj)
          object_array.push(obj);
        }
      }
      this.table_data += `</tr>`;
    }
    let result = {};
    console.log(object_array,"Object Array")
    console.log(column_array,"column Array")
    for (let i = 0; i < object_array.length; i++) {
      result[object_array[i].key] = object_array[i].value;
    }
    console.log(result);
    this.json_format = result;
    this.table_data += "</table>";
    this.table_data;
    $("#tablessss").html(this.table_data);
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
      console.log(this.table_data, "file");
    }
  }


  format() {
    console.log('######################################')
    console.log(this.json_format);
    console.log('######################################')
  }
}
