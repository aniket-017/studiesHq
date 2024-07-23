class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
 
search() {

    const keyword = this.queryStr.keyword
      ? {
          $or: [
            
            {
              screwType: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              certification: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              brand: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              material: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              threadSize: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              rating: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
            {
              description: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            },
          
          ],
        }
      : {};
  
      this.query = this.query.find({ ...keyword });
  
    return this;
  }

  filter() {
    // Create an object to hold the filter criteria
    const filterCriteria = {};

    // Copy the query string object
    const queryCopy = { ...this.queryStr };
    console.log("Query Copy Before:", queryCopy);

    // Remove unnecessary fields from the query string object
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    console.log("Query Copy After:", queryCopy);

    // Add each remaining field to the filter criteria
    Object.keys(queryCopy).forEach((key) => {
        filterCriteria[key] = queryCopy[key];
    });

    // If there are no filter criteria, return immediately
    if (Object.keys(filterCriteria).length === 0) {
        return this;
    }

    console.log("Filter Criteria:", filterCriteria);

    // Apply the filter criteria to the query
    this.query = this.query.find(filterCriteria);

    return this;
}




  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
