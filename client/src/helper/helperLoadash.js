
import  _ from 'lodash';


export function getSum(transaction,type){
    //GroupBy "type" attribute
    let sum = _(transaction)
                .groupBy("type")
                .map((obj,key)=>{
                    // return obj - return objects in that type
                   // return _.sumBy(obj,'amount') //sum of objects's amount
                //   console.log("obkj",[...new Set(obj.map(e => e.categories_info[0].color ))]) //remove duplicate - uniq = [...new Set(array)]; 
                   if(!type)
                    return  _.sumBy(obj,'amount')
                   else
                    return{
                        'type':key,
                        'color':[...new Set(obj.map(e => e.categories_info[0].color ))],
                        'total': _.sumBy(obj,'amount')
                    }
                }).value()
                return sum;
    

} 

export function getLabels(transaction){
   
    let amountSum = getSum(transaction,'type')
    let Total = _.sum(getSum(transaction)) // sum of all values
   // console.log("total",Total);
    let percent = _(amountSum)
                    .map((obj)=>_.assign(obj,{percent:(100*obj.total)/Total}))
                    .value()

                 //   console.log("object",percent);

                return percent
}


export function chartData(transaction,custom){

    let bg=_.map(transaction,a=>a.categories_info[0].color) 
    let uniqBg = [...new Set(bg)]; //Remove Duplicate Array
  //  console.log("bg color",uniqBg);

    let dataValues =getSum(transaction);


    const config = {
  
        data:{
            datasets: [{
                
                data: dataValues,
                backgroundColor: uniqBg,
                hoverOffset: 4,
                borderRadius:30,
                spacing:6,
             
              }]
    
        },
        options:{
            cutout:115 //Decrease the width of chart
        }
      }

      return custom??config
}

export function getTotal(transaction){
    return _.sum(getSum(transaction)) // sum of all values
}