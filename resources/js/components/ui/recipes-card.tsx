export default function RecipesCard(){
    return (
        <div className="overflow-hidden max-w-sm mx-auto">
            {/* Recipe Image */}
            <div className="relative h-48 bg-bg-card">
                <img 
                    src="/assets/images/home/Rectangle 2393.png" 
                    alt="SWEET BBQ GLAZED CHICKEN WINGS"
                    className="w-full h-full object-cover"
                />
            </div>
            
            {/* Recipe Content */}
            <div className="mt-6">
                {/* Recipe Title */}
                <h2 className="text-xl font-normal text-text-black font-bebas-neue mb-2">
                    Sweet BBQ Glazed Chicken Wings
                </h2>
                
                {/* Recipe Time */}
                <p className="text-base text-text-black-50 font-normal">
                    Prep time 4 min | Cook 4h
                </p>
            </div>
        </div>
    )
}