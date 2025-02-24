const data =  {
    students : [
        {name: "John", age: 20},
        {name: "Doe", age: 22},
        {name: "Smith", age: 25},
        {name: "Alex", age: 21},
        {name: "Tom", age: 23}
    ]
}

const getStudentsData = async () => {
    return data;
}


module.exports = getStudentsData;