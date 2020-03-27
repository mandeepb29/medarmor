import { Component, OnInit } from "@angular/core";
import { AuthService } from 'src/app/auth.service';
declare var $: any;

@Component({
  selector: "app-genome-data",
  templateUrl: "./genome-data.component.html",
  styleUrls: ["./genome-data.component.scss"]
})
export class GenomeDataComponent implements OnInit {
  csvContent;
  table_data;
  json_format;
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}

  onFileLoad(fileLoadedEvent) {
    console.log('hit')
    const textFromFileLoaded = fileLoadedEvent.target.result;
    // console.log(textFromFileLoaded)

  }

  onFileSelect(input: HTMLInputElement) {
    const files = input.files;
    // console.log(files[0].target.result)
    var content = this.csvContent;

    if (files && files.length) {
      // console.log("Filename: " + files[0].name);
      // console.log("Type: " + files[0].type);
      // console.log("Size: " + files[0].size + " bytes");

      const fileToRead = files[0];

      const fileReader = new FileReader();
      fileReader.onload = () => {
        console.log(fileReader.result)
        this.csvContent = fileReader.result;
    // console.log(this.csvContent);
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
          // console.log(column_array[cell_count])
          let obj = {
            key: abc[cell_count],
            value: column_array[cell_count]
          };
          // console.log(obj)
          object_array.push(obj);
        }
      }
      this.table_data += `</tr>`;
    }
    let result = {};
    // console.log(object_array,"Object Array")
    // console.log(column_array,"column Array")
    for (let i = 0; i < object_array.length; i++) {
      result[object_array[i].key] = object_array[i].value;
    }
    console.log(result);
    // this.auth.sendRequest(result);
    this.json_format = result;
    // console.log(this.json_format);
    this.table_data += "</table>";
    this.table_data;
    $("#tablessss").html(this.table_data);
      };

      fileReader.readAsText(fileToRead);
    }
  }


  format() {
    alert("Genomic Data Uploaded");
    console.log('######################################')
    console.log(this.json_format);
    console.log('######################################')
    this.auth.sendRequest(this.json_format);
  }
}
