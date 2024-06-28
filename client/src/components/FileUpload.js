import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const onSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
                    setTimeout(() => setUploadPercentage(0), 1000);
                }
            });
            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });

            setMessage('File Uploaded Successfully!');
        } catch (err) {
            if (err.response.status === 500) {
                setMessage('There was a problem with the server');
            } else {
                setMessage(err.response.data.msg);
            }
        }
    };

    return (
        <Fragment>
            <div style={styles.container}>
                <h1 style={styles.heading}>Upload your Assignment Here</h1>
                <div style={styles.description}>
                    <img src="https://icons8.com/icon/VYvOvJrZaC9T/key" alt="Key Icon" style={styles.icon} />
                    <span>File name</span>
                    <p>When submitting one page, you can upload PDF or JPG files.</p>
                </div>
                <div style={styles.formContainer}>
                    {message ? <Message msg={message} /> : null}
                    <form onSubmit={onSubmit}>
                        <div className='custom-file md-4'>
                            <input
                                type="file"
                                className='custom-file-input'
                                id='customFile'
                                onChange={onChange}
                            />
                            <label className='custom-file-label' htmlFor='customFile'>{filename}</label>
                        </div>
                        <div style={styles.progressContainer}>
                            <Progress percentage={uploadPercentage} />
                        </div>
                        <input type='submit' value='Upload' style={styles.uploadBtn} />
                    </form>
                </div>
                {
                    uploadedFile.fileName ? (
                        <div style={styles.uploadedFile}>
                            <div className="col-md-6 m-auto">
                                <h3>{uploadedFile.fileName}</h3>
                                <img src={uploadedFile.filePath} alt="" />
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </Fragment>
    );
}

export default FileUpload;

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    icon: {
        width: '24px',
        marginRight: '5px',
        verticalAlign: 'middle',
    },
    description: {
        textAlign: 'center',
        marginBottom: '40px',
    },
    formContainer: {
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '5px',
    },
    progressContainer: {
        marginTop: '20px',
    },
    uploadBtn: {
        display: 'block',
        width: '100%',
        marginTop: '20px',
    },
    uploadedFile: {
        marginTop: '40px',
    },
};
