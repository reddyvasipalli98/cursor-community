// import '@aws-amplify/ui-react/styles.css';
// import { useState } from 'react';
// import { useUser, usePermissions } from '../hooks/useUser';
// import { UserProfileCard, WelcomeMessage } from './UserProfile';

// interface UploadedFile {
//   key: string;
//   name: string;
//   uploadTime: string;
//   size?: number;
// }

// const FileUpload = () => {
//   const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const { isAuthenticated, userName, userEmail } = useUser();
//   const { canUploadFiles } = usePermissions();


//   const handleUploadStart = () => {
//     setIsUploading(true);
//   };

//   const handleUploadSuccess = ({ key }: { key: string }) => {
//     console.log('Upload complete:', key);
    
//     // Extract filename from key
//     const fileName = key.split('/').pop() || key;
    
//     // Add to uploaded files list
//     const newFile: UploadedFile = {
//       key,
//       name: fileName,
//       uploadTime: new Date().toLocaleString()
//     };
    
//     setUploadedFiles(prev => [...prev, newFile]);
//     setIsUploading(false);
//   };

//   const handleDownload = async (fileKey: string, fileName: string) => {
//     try {
//       console.log('Downloading file:', fileKey);
      
//       // Download file from S3
//       const downloadResult = await downloadData({
//         path: fileKey
//       }).result;
      
//       // Convert to blob and create download link
//       const blob = await downloadResult.body.blob();
//       const url = window.URL.createObjectURL(blob);
      
//       // Create temporary download link
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = fileName;
//       document.body.appendChild(link);
//       link.click();
      
//       // Cleanup
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
      
//     } catch (error) {
//       console.error('Download failed:', error);
//       alert('Failed to download file. Please try again.');
//     }
//   };

//   const handleUploadError = (error: any) => {
//     console.error('Upload failed - Full error details:', {
//       error,
//       message: error?.message,
//       code: error?.code,
//       statusCode: error?.response?.status,
//       response: error?.response?.data,
//       stack: error?.stack
//     });
    
//     // Show user-friendly error message
//     let errorMessage = 'Upload failed. ';
//     if (error?.code === 'NoCredentials' || error?.message?.includes('credentials')) {
//       errorMessage += 'Please log in with Google first.';
//     } else if (error?.response?.status === 400) {
//       errorMessage += 'Invalid request. Please check file type and size.';
//     } else if (error?.response?.status === 403) {
//       errorMessage += 'Access denied. Please check your permissions.';
//     } else {
//       errorMessage += error?.message || 'Please try again.';
//     }
    
//     alert(errorMessage);
//     setIsUploading(false);
//   };

//   return (
//     <div className="file-upload-container">
//       <div className="upload-section">
//         <h3>Upload Files</h3>
        
//         <WelcomeMessage />
        
//         {/* User Information Display */}
//         <div style={{ marginBottom: '20px' }}>
//           <UserProfileCard compact={true} showEmail={true} />
//         </div>
        
//         {/* Upload Status */}
//         {isAuthenticated ? (
//           <div style={{ 
//             padding: '12px', 
//             backgroundColor: 'rgba(16, 185, 129, 0.1)', 
//             border: '1px solid rgba(16, 185, 129, 0.3)',
//             borderRadius: '8px',
//             marginBottom: '15px'
//           }}>
//             <p style={{ color: '#10b981', margin: 0, fontSize: '14px' }}>
//               ✅ Ready to upload! Logged in as {userName} ({userEmail})
//             </p>
//           </div>
//         ) : (
//           <div style={{ 
//             padding: '12px', 
//             backgroundColor: 'rgba(239, 68, 68, 0.1)', 
//             border: '1px solid rgba(239, 68, 68, 0.3)',
//             borderRadius: '8px',
//             marginBottom: '15px'
//           }}>
//             <p style={{ color: '#ef4444', margin: 0, fontSize: '14px' }}>
//               ⚠️ Please sign in with Google in the top menu to upload files
//             </p>
//           </div>
//         )}
        
//         {/* File Upload Section */}
//         {canUploadFiles && isAuthenticated ? (
//           <FileUploader
//             acceptedFileTypes={['.pdf', '.docx', '.txt', '.md', '.json', '.png', '.jpg', '.jpeg', '.gif']}
//             maxFileCount={5}
//             maxFileSize={5000000} // 5MB limit
//             onUploadStart={handleUploadStart}
//             onUploadSuccess={handleUploadSuccess}
//             onUploadError={handleUploadError}
//           />
//         ) : (
//           <div style={{
//             textAlign: 'center',
//             padding: '30px',
//             backgroundColor: 'rgba(0, 0, 0, 0.3)',
//             border: '1px solid rgba(255, 255, 255, 0.1)',
//             borderRadius: '8px',
//             color: '#9ca3af'
//           }}>
//             <p>🔐 File upload requires Google authentication</p>
//             <p>Sign in using the Google button in the top navigation menu</p>
//           </div>
//         )}
        
//         {isUploading && (
//           <div className="upload-status">
//             <p>Uploading file...</p>
//           </div>
//         )}
//       </div>

//       {uploadedFiles.length > 0 && (
//         <div className="uploaded-files-section">
//           <h3>Uploaded Files</h3>
//           <div className="files-list">
//             {uploadedFiles.map((file, index) => (
//               <div key={index} className="file-item">
//                 <div className="file-info">
//                   <span className="file-name">{file.name}</span>
//                   <span className="file-time">{file.uploadTime}</span>
//                 </div>
//                 <div className="file-actions">
//                   <button 
//                     className="download-btn"
//                     onClick={() => handleDownload(file.key, file.name)}
//                   >
//                     📥 Download
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload