import { Card } from '../ui/card'
import { Button } from '../ui/button'
import pdfimage from '../../assets/icons/notes/image 59.png'
import downloadimg from '../../assets/icons/notes/Download.png'
import { FONTS } from '@/constants/uiConstants';
import Mainbutton from './coursebutton'
import { useNavigate } from 'react-router-dom';
import navigationicon from "../../assets/courses icons/navigation arrow.svg"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCourse } from '@/features/Course/reducer/selector';

interface Course {
  notes: string;
}

interface NoteData {
  date: string;
  time: string;
  fileName?: string;
  fileUrl?: string; // Add this for actual file URLs
  pdfBlob?: Blob; // Add this for generated PDFs
}

const NotesMaterials = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState<Course | null>(null);

  const coursedata = useSelector(selectCourse);

  useEffect(() => {
    setCourses(coursedata)
  }, [coursedata])

  const notesData: NoteData[] = [
    { date: '12-06-2025', time: '09.00 AM', fileName: 'Class_Notes_12_06_2025.pdf' },
    { date: '13-06-2025', time: '10.00 AM', fileName: 'Class_Notes_13_06_2025.pdf' },
    { date: '14-06-2025', time: '11.00 AM', fileName: 'Class_Notes_14_06_2025.pdf' },
    { date: '15-06-2025', time: '09.30 AM', fileName: 'Class_Notes_15_06_2025.pdf' },
    { date: '16-06-2025', time: '10.30 AM', fileName: 'Class_Notes_16_06_2025.pdf' },
    { date: '17-06-2025', time: '08.00 AM', fileName: 'Class_Notes_17_06_2025.pdf' },
    { date: '18-06-2025', time: '09.00 AM', fileName: 'Class_Notes_18_06_2025.pdf' },
    { date: '19-06-2025', time: '10.00 AM', fileName: 'Class_Notes_19_06_2025.pdf' },
    { date: '20-06-2025', time: '11.00 AM', fileName: 'Class_Notes_20_06_2025.pdf' },
    { date: '21-06-2025', time: '09.30 AM', fileName: 'Class_Notes_21_06_2025.pdf' },
  ]

  // Function to generate a sample PDF blob (you can replace this with actual PDF generation)
  const generateSamplePDF = (date: string, time: string): Blob => {
    const content = `BT
/F1 24 Tf
100 700 Td
(Class Notes - ${date} at ${time}) Tj
ET`;

    const pdf = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj
4 0 obj<</Length ${content.length}>>stream
${content}
endstream
endobj
5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000115 00000 n 
0000000222 00000 n 
0000000334 00000 n 
trailer<</Size 6/Root 1 0 R>>
startxref
420
%%EOF`;

    return new Blob([pdf], { type: "application/pdf" });
  };

  // Function to handle download
  const handleDownload = (note: NoteData, index: number) => {
    try {
      let blob: Blob;
      let fileName: string;
      console.log(index)

      if (note.fileUrl) {
        fetch(note.fileUrl)
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = note.fileName || `notes_${note.date}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          })
          .catch(error => {
            console.error('Download failed:', error);
            alert('Download failed. Please try again.');
          });
      } else {
        blob = note.pdfBlob || generateSamplePDF(note.date, note.time);
        fileName = note.fileName || `Class_Notes_${note.date.replace(/-/g, '_')}.pdf`;

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Download failed. Please try again.');
    }
  };

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={() => {
            navigate(-1)
          }}
          className="bg-[#EBEFF3] text-[#333] cursor-pointer hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
        >
          <img src={navigationicon} alt="Back" />
        </Button>
        <h1 className="text-black text-2xl font-semibold">Class Notes & Materials</h1>
      </div>

      <Mainbutton activeTabs={"notes"} />

      <h1 className="text-black text-2xl font-semibold mb-6">Upload Notes</h1>

      <Card className="overflow-hidden bg-[#EBEFF3]">
        <div className="flex flex-col">
          <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white p-6 sticky top-0 z-10 ml-4 mr-4 mb-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center !text-white" style={{ ...FONTS.heading_02 }}>File</div>
              <div className="text-center !text-white" style={{ ...FONTS.heading_02 }}>Date</div>
              <div className="text-center !text-white" style={{ ...FONTS.heading_02 }}>Chapter</div>
              <div className="text-center !text-white" style={{ ...FONTS.heading_02 }}>Download</div>
            </div>
          </Card>

          <div className="max-h-[500px] overflow-y-auto mx-4 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100" style={{ scrollbarWidth: "none" }}>
            {courses?.notes && courses.notes.length > 0 ? (
              notesData.map((note, index) => (
                <Card
                  key={index}
                  className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-4 mb-2 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div className="flex justify-center">
                      <img src={pdfimage} className="w-10 h-12" alt="PDF icon" />
                    </div>
                    <div className="text-center !text-gray-600" style={{ ...FONTS.para_01 }}>
                      {note.date}
                    </div>
                    <div className="text-center !text-gray-600" style={{ ...FONTS.para_01 }}>
                      {note.time}
                    </div>

                    <div className="flex justify-center">
                      <Button
                        onClick={() => handleDownload(note, index)}
                        className="bg-[#EBEFF3] w-20 h-14 hover:bg-[#dde3e9] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] transition-colors"
                        variant="outline"
                        title="Download PDF"
                      >
                        <img src={downloadimg} className="w-8 h-10" alt="Download" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center text-gray-500 mt-4">No notes available.</div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default NotesMaterials