class ApiFeatures {
    constructor(model, reqQuery) {
        this.model = model;
        this.reqQuery = reqQuery;
    }
    filter() {
        let query = { ...this.reqQuery };
        // STEP1 EXCLUDE FEATURES, AND ONLY KEEP THE FIELDS, Prepare for data filterating
        const excludeFields = ["sort", "page", "fields", "limit"];
        excludeFields.forEach((field) => delete query[field]);

        let queryStr = JSON.stringify(query);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => "$" + match
        );
        query = JSON.parse(queryStr);
        this.mongooseQuery = this.model.find(query);
        return this;
    }
    sort() {
        // sorting
        if (this.reqQuery.sort) {
            this.reqQuery.sort = this.reqQuery.sort.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.sort(this.reqQuery.sort);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
        }
        return this;
    }
    async pagination() {
        const page = this.reqQuery.page || 1;
        const limit = this.reqQuery.limit || 100;
        const skipValue = (page - 1) * limit;
        this.mongooseQuery = this.mongooseQuery.skip(skipValue).limit(limit);
        if (this.reqQuery.page) {
            const numPosts = await this.model.countDocuments();
            if (skipValue >= numPosts)
                return next(new AppError("This page does not exist!", 404));
        }
        return this;
    }

    fieldlimiting() {
        if (this.reqQuery.fields) {
            this.reqQuery.fields = this.reqQuery.fields.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.select(
                this.reqQuery.fields
            );
        } else {
            this.mongooseQuery = this.mongooseQuery.select("-__v"); // exclude
        }
        return this;
    }
}
module.exports = ApiFeatures;
