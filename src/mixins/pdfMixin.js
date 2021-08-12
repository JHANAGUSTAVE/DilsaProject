import jsPDF from "jspdf";
import html2canvas from "html2canvas"
export default {
    methods: {
        /**
         * exporting html to pdf
         */
        exportToPdf() {
          const doc = new jsPDF();
          /** WITH CSS */


          // html2canvas(document.querySelector("#content")).then(canvas => {
          //   document.body.appendChild(canvas)
          // });


          var canvasElement = document.createElement('canvas');
          html2canvas(document.querySelector("#contentPDF")).then(function (canvas) {
            doc.text(20,5, 'Test of report pdf');
            const img = canvas.toDataURL("image/jpeg"); 
            doc.addImage(img,'JPEG',0,20);
            doc.save("test.pdf");
          });
        },
    }
}
       
