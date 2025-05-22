 // --------------------------
 module.exports = function timestamp(schema) {
  schema.add({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  schema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
  });
};