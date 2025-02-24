const getStudentsData = require('./data');

const students = async (req, res) => {
    try
    {   
        console.log("Request Initiated For ", req.url);
        const studentData = await getStudentsData();
        console.log("Student Data", studentData);
        console.log("Request Completed For ", req.url)
        return res.status(200).json({message: "This is a List Of Students", studentData});
    }
    catch(e)
    {
        console.log("Something Went Wrong",e);
        return res.status(500).json({message: "Internal Server Error", error: e, endpoint : req.url});
    }

}

module.exports = students;