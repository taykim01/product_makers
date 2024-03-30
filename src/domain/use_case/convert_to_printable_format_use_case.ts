import CodeResponse from "@/app/code_response";
import { Result } from "@/app/types";

export default class ConvertToPrintableFormatUseCase {
    convert(questionList: string[], quoteList: string[]): CodeResponse {
        let formattedText = "<문제>\n\n";
        for (let i = 0; i < questionList.length; i++) {
            formattedText += `Question ${i + 1}: ${questionList[i]}\nAnswer: ${quoteList[i]}\n\n`;
        }

        let printWindow = window.open('', '', 'height=600,width=800');
        if (printWindow) {
            printWindow.document.write('<html><head><title>Print</title></head><body>');
            printWindow.document.write('<pre>' + formattedText + '</pre>'); // Use <pre> for preformatted text to maintain formatting
            printWindow.document.write('</body></html>');
            printWindow.document.close(); // Necessary for IE >= 10
            printWindow.focus(); // Necessary for IE >= 10

            // Delay printing until the content is fully loaded
            printWindow.onload = function () {
                printWindow.print();
                printWindow.close();
            };
        } else {
            // If the window couldn't be opened, likely due to a popup blocker
            alert('Printing failed. Please allow popups for this website and try again.');
        }

        return new CodeResponse(Result.SUCCESS, '');
    }
}
