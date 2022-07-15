var http = require('http');
var fs = require("fs");
var qs = require("querystring");
//create a server object:
var MongoClient = require('mongodb').MongoClient;
var dbUrl='mongodb://localhost:27017/';
http.createServer(function (req, res) {
   
if(req.url=="/login"){	

	console.log("testing")
	
		if (req.method=="POST"){
			console. log ("hi i am posting");
			return req.on ('data',function(data){
			formdata='';
			formdata+=data;
			console.log(formdata);
			data=qs.parse(formdata);
			user=data['apple'];
			pass=data['orange'];
			console.log(user);
			MongoClient.connect(dbUrl,function(err,db){
				var dbo=db.db("testdb");
				var myobj={"email":user,"pass":pass};
				//dbo.collection("table1").insertOne(myobj),function(err,res){
					 dbo.collection("table1").find(myobj).toArray(function(err, result) {
					 if(err)throw err;
					 console.log(result);
				 if(result.length>0){
					 	res.end("success");
					 	//console.log('ok');
					 }else{
					 	res.end("fail");
					 }
					
					 });

					//var myquery = { name: '123' };
					//dbo.collection("table1").deleteOne(myquery, function(err, obj) {
						//if (err) throw err;
						//console.log("1 document deleted");
						//db.close();
					//});
								
			
			//Write databse Insert/Update/Query code here. .
			console.log('mongodb is running!');
			//db.close();//close connection
				}	
		);
			
	
			

			//res.end("success");

			});

			

		}else{
			//res.end("abc");
			console.log("loading");
			sendFileContent(res,"login.html","text/html");

			}
	
} else if(req.url=="/fav"){
		
	if (req.method=="POST"){
		console. log ("hi i am posting");
		return req.on ('data',function(data){
		
		formdata='';
		formdata+=data;
		data=qs.parse(formdata);
		item=data['item'];
		user=data['user'];
		console.log(item);
		console.log(user);
		console.log(formdata);
		MongoClient.connect(dbUrl,function(err,db){
			var dbo=db.db("testdb");
			var myobj={"item":item,"user":user};
			//dbo.collection("fav").insertOne(myobj),function(err,res){
				// dbo.collection("table1").find(myobj).toArray(function(err, result) {
				// if(err)throw err;
				// console.log(result);
				// if(result.length>0){
				// 	res.end("success");
				// 	//console.log('ok');
				// }else{
				// 	res.end("fail");
				// }
				
				// });
			dbo.collection("fav").insertOne(myobj, function(err, res) {
				if (err) throw err;
				console.log("1 document inserted");
				db.close();
			});


							
		
		//Write databse Insert/Update/Query code here. .
		console.log('mongodb is running!');
		//db.close();//close connection
			}	
	);
		//user=data[''];
		//pass=data[''];
		
		}
	);
		

		

		res.end("success");


	}
		
}
else if(req.url=="/logout"){
		
	sendFileContent(res,"logout.html","text/html");		
		
	}	

	else if(req.url=="/product"){
		
		sendFileContent(res,"product.html","text/html");		
			
		}		
	
	else if(req.url=="/reg"){
		console.log("testing")
	
		if (req.method=="POST"){
			console. log ("hi i am posting");
			return req.on ('data',function(data){
			formdata='';
			formdata+=data;
			console.log(formdata);
			data=qs.parse(formdata);
			username=data['username'];
			email=data['email'];
			password=data['password'];
			console.log(username);
			MongoClient.connect(dbUrl,function(err,db){
				var dbo=db.db("testdb");
				//dbo.collection("table1").insertOne(myobj),function(err,res){
					// dbo.collection("table1").find(myobj).toArray(function(err, result) {
					// if(err)throw err;
					// console.log(result);
					// if(result.length>0){
					// 	res.end("success");
					// 	//console.log('ok');
					// }else{
					// 	res.end("fail");
					// }
					
					// });

					var myobj = { name: username,email:email,pass:password };
					dbo.collection("table1").insertOne(myobj),function(err,res){
						if (err) throw err;
						console.log("1 document deleted");
						db.close();
					};
								
			
			//Write databse Insert/Update/Query code here. .
			console.log('mongodb is running!');
			//db.close();//close connection
				}	
		);
			
	
			

			res.end("success");

			});

			

		}else{
			//res.end("abc");
			console.log("loading");
			sendFileContent(res,"reg1.html","text/html");

			}		
	}
	else if(req.url=="/mainpage"){
		console.log(":hihihihi");
		sendFileContent(res,"mainpage.html","text/html");		
		} 




else if(/^\/[a-zA-Z0-9\/-/]*.js$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/javascript");
}else if(/^\/[a-zA-Z0-9\/-/]*.bundle.min.js$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/javascript");
}else if(/^\/[a-zA-Z0-9\/-/]*.css$/.test(req.url.toString())){
	console.log(req.url.toString().substring(1));
sendFileContent(res, req.url.toString().substring(1), "text/css");
}else if(/^\/[a-zA-Z0-9\/-]*.min.css$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/css");
}else if(/^\/[a-zA-Z0-9\/-]*.jpg$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "image/jpg");
}else if(/^\/[a-zA-Z0-9-._\/]*.min.js$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/javascript");
}else if(/^\/[a-zA-Z0-9-]*.min.css.map$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/map");
}else if(/^\/[a-zA-Z0-9\/-/]*.min.js.map$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/map");
}else if(/^\/[a-zA-Z0-9\/-/]*.css.map$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/map");
}else if(/^\/[a-zA-Z0-9\/-/]*.png$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "image/png");
}else if(/^\/[a-zA-Z0-9\/-/]*.ico$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/ico");
}else if(/^\/[a-zA-Z0-9\/-/?]*.ttf$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/font");
}else if(/^\/[a-zA-Z0-9\/-/?]*.woff$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/woff");
}else if(/^\/[a-zA-Z0-9\/-/?]*.woff2$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/woff2");
}else{
console.log("Requested URL is: " + req.url);
res.end();
}
}).listen(8080); //the server object listens on port 8080


function sendFileContent(response, fileName, contentType){
fs.readFile(fileName, function(err, data){
if(err){
response.writeHead(404);
response.write("Not Found!");
}
else{
response.writeHead(200, {'Content-Type': contentType});
response.write(data);
}
response.end();
});
}