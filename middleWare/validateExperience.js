const validateExperience = (req,res,next)=>{
    const errors =[];
    if(!req.body.company?.trim()) errors.push('company Name is required');
    if(!req.body.position?.trim()) errors.push('Position is required');
    if(!req.body.StartDate) errors.push('Start Date is required');
    if (req.body.endDate && req.body.StartDate && new Date(req.body.endDate) < new Date(req.body.StartDate)) {
        errors.push('End date must be after start date');
    }
    if(errors.length > 0){
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        })
    }
    next();
}

module.exports = validateExperience;