//all package types variables
var caseunitadd = 0,
  boxadd = 0,
  pieceadd = 0,
  packetsadd = 0,
  tinadd = 0,
  bundleadd = 0,
  kattaadd = 0,
  bagadd = 0,
  kgsadd = 0,
  centadd = 0,
  tubeadd = 0,
  coneadd = 0,
  itemcodeadd = 0;
  let itemcodeInv="",totalPOqty="",totalInvqty="",totalqtyInvPO="";
//Get current date
var currentdate = new Date().toLocaleString();;
//Configuring Firebase application
var config = {
  apiKey: "AIzaSyBuBrpKvwMMnMJWjGf4UsJFZPYGaiVm250",
  authDomain: "fir-js-13ecc.firebaseapp.com",
  databaseURL: "https://fir-js-13ecc.firebaseio.com",
  projectId: "fir-js-13ecc",
  storageBucket: "fir-js-13ecc.appspot.com",
  messagingSenderId: "218732343795"
};
firebase.initializeApp(config);
var currentuseremail = ""; // a global variable to store current user emil ID
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    currentuseremail = user.email;
    //Allow only authenticated user to view data

    //Show sidebar,feture div & hide login screen
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("noaccessdiv").style.display ="none";
    /*  else {
      //Hide all show no worker access DIV
      console.log("Wrong authentication");
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "none";
      document.getElementById("noaccessdiv").style.display = "block";

    }*/

    var user = firebase.auth().currentUser;
    if (user != null) {
      var email_id = user.email;
      // uncomment  document.getElementById("user_para").innerHTML = "Hi " + email_id;
    }

  } else {
    // No user is signed in.
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});
//Login function
function login() {

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;

    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
  });

}
//Logout function
function logout() {
  firebase.auth().signOut();
  document.getElementById("noaccessdiv").style.display = "none";
}
var database = firebase.database(); //Get database reference
//Load all customer data
//Only admin can see customer data
database.ref('customers').on('child_added', function(data) {
  add_data_table(data.val().customername, data.val().customertype, data.val().phonenumber, data.val().whatsappnumber, data.val().address, data.val().pincode, data.val().email, data.key);
});
database.ref('customers').on('child_changed', function(data) {
  update_data_table(data.val().customername, data.val().customertype, data.val().phonenumber, data.val().whatsappnumber, data.val().address, data.val().pincode, data.val().email, data.key);
});
database.ref('customers').on('child_removed', function(data) {
  remove_data_table(data.key)
}); //Worker cant see customer data
//Add entered data to customer table in HTML
function add_data_table(customername, customertype, phonenumber, whatsappnumber, address, pincode, email, phonenumber) {
  $("#custable").prepend('<tr id="' + phonenumber + '"><th>' + customername + '</th><th>' + customertype + '</th><th>' + phonenumber + '</th><th>' + whatsappnumber + '</th><th>' + address + '</th><th>' + pincode + '</th><th>' + email + '</th><th><a href="#" data-key="' + phonenumber + '" class="card-footer-item btnEdit">Edit</a></th><th><a href="#" class="card-footer-item btnRemove"  data-key="' + phonenumber + '">Remove</a></th></tr>');
}
//Update entered data to customer table in HTML
function update_data_table(customername, customertype, phonenumber, whatsappnumber, address, pincode, email, phonenumber) {
  $("#custable #" + phonenumber).html('<th>' + customername + '</th><th>' + customertype + '</th><th>' + phonenumber + '</th><th>' + whatsappnumber + '</th><th>' + address + '</th><th>' + pincode + '</th><th>' + email + '</th><th><a href="#" data-key="' + phonenumber + '" class="card-footer-item btnEdit">Edit</a></th><th><a href="#" class="card-footer-item btnRemove"  data-key="' + phonenumber + '">Remove</a></th>');
}
//Remove desired data from customer table in HTML
function remove_data_table(phonenumber) {
  $("#custable #" + phonenumber).remove();
}
/**DB operations for Customer **/
//new customer data
function new_data(customername, customertype, phonenumber, whatsappnumber, address, pincode, email, phonenumber) {

  database.ref('customers/' + phonenumber).set({
    customername: customername,
    customertype: customertype,
    phonenumber: phonenumber,
    whatsappnumber: whatsappnumber,
    address: address,
    pincode: pincode,
    email: email
  });

}
//Update customer data
function update_data(customername, customertype, phonenumber, whatsappnumber, address, pincode, email, key) {
  database.ref('customers/' + phonenumber).update({
    customername: customername,
    customertype: customertype,
    phonenumber: phonenumber,
    whatsappnumber: whatsappnumber,
    address: address,
    pincode: pincode,
    email: email
  });
}
$("#btnAdd").click(function() {
  $("#txtcustomerName").val("");
  $("#txtcustomerType").val("");
  $("#txtPhoneNumber").val("");
  $("#txtWhatsappNumber").val("");
  $("#txtAddress").val("");
  $("#txtPincode").val("");
  $("#txtEmail").val("");
  $("#txtType").val("N");
  $("#txtKey").val("0");
  $("#modal").addClass("is-active");
});
$("#btnSave").click(function() {
  if ($("#txtType").val() == 'N') {
    database.ref('customers').once("value").then(function(snapshot) {
      new_data($("#txtcustomerName").val(), $("#txtcustomerType").val(), $("#txtPhoneNumber").val(), $("#txtWhatsappNumber").val(), $("#txtAddress").val(), $("#txtPincode").val(), $("#txtEmail").val(), $("#txtPhoneNumber").val());
    });
  } else {
    update_data($("#txtcustomerName").val(), $("#txtcustomerType").val(), $("#txtPhoneNumber").val(), $("#txtWhatsappNumber").val(), $("#txtAddress").val(), $("#txtPincode").val(), $("#txtEmail").val(), $("#txtPhoneNumber").val());
  }
  $("#txtPhoneNumber").prop("readonly", false);
  $("#btnClose").click();
});
$(document).on("click", ".btnEdit", function(event) {
  event.preventDefault();
  key = $(this).attr("data-key");
  $("#txtPhoneNumber").prop("readonly", true);
  database.ref('customers/' + key).once("value").then(function(snapshot) {
    $("#txtcustomerName").val(snapshot.val().customername);
    $("#txtcustomerType").val(snapshot.val().customertype);
    $("#txtPhoneNumber").val(snapshot.val().phonenumber);
    $("#txtWhatsappNumber").val(snapshot.val().whatsappnumber);
    $("#txtAddress").val(snapshot.val().address);
    $("#txtPincode").val(snapshot.val().pincode);
    $("#txtEmail").val(snapshot.val().email);
    $("#txtType").val("E");
    $("#txtKey").val(key);
  });
  $("#modal").addClass("is-active");
});
$(document).on("click", ".btnRemove", function(event) {
  event.preventDefault();
  key = $(this).attr("data-key");
  database.ref('customers/' + key).remove();
})
$("#btnClose,.btnClose").click(function() {
  $("#modal").removeClass("is-active");
});
/*************seller management***************/
database.ref('sellers').on('child_added', function(data) {
  add_seller_data_table(data.val().sellername, data.val().companyname, data.val().phonenumber, data.val().whatsappnumber, data.val().address, data.val().pincode, data.val().email, data.key);

});
database.ref('sellers').on('child_changed', function(data) {
  update_seller_data_table(data.val().sellername, data.val().companyname, data.val().phonenumber, data.val().whatsappnumber, data.val().address, data.val().pincode, data.val().email, data.key);
});
database.ref('sellers').on('child_removed', function(data) {
  remove_seller_data_table(data.key)
});
function add_seller_data_table(sellername, companyname, phonenumber, whatsappnumber, address, pincode, email, phonenumber) {
  $("#sellertable").prepend('<tr id="' + phonenumber + '"><th>' + sellername + '</th><th>' + companyname + '</th><th>' + phonenumber + '</th><th>' + whatsappnumber + '</th><th>' + address + '</th><th>' + pincode + '</th><th>' + email + '</th><th><a href="#" data-key="' + phonenumber + '" class="card-footer-item btnEdit">Edit</a></th><th><a href="#" class="card-footer-item btnRemove"  data-key="' + phonenumber + '">Remove</a></th></tr>');
}
function update_seller_data_table(sellername, companyname, phonenumber, whatsappnumber, address, pincode, email, phonenumber) {
  $("#sellertable #" + phonenumber).html('<th>' + sellername + '</th><th>' + companyname + '</th><th>' + phonenumber + '</th><th>' + whatsappnumber + '</th><th>' + address + '</th><th>' + pincode + '</th><th>' + email + '</th><th><a href="#" data-key="' + phonenumber + '" class="card-footer-item btnEdit">Edit</a></th><th><a href="#" class="card-footer-item btnRemove"  data-key="' + phonenumber + '">Remove</a></th>');
}
function remove_seller_data_table(phonenumber) {
  $("#sellertable #" + phonenumber).remove();
}
function new_seller_data(sellername, companyname, phonenumber, whatsappnumber, address, pincode, email, phonenumber) {
  database.ref('sellers/' + phonenumber).set({
    sellername: sellername,
    companyname: companyname,
    phonenumber: phonenumber,
    whatsappnumber: whatsappnumber,
    address: address,
    pincode: pincode,
    email: email
  });
}
function update_seller_data(sellername, companyname, phonenumber, whatsappnumber, address, pincode, email, key) {
  database.ref('sellers/' + phonenumber).update({
    sellername: sellername,
    companyname: companyname,
    phonenumber: phonenumber,
    whatsappnumber: whatsappnumber,
    address: address,
    pincode: pincode,
    email: email
  });
}
$("#btnSellerAdd").click(function() {
  $("#txtSellerName").val("");
  $("#txtSellerCompanyName").val("");
  $("#txtSellerPhoneNumber").val("");
  $("#txtSellerWhatsappNumber").val("");
  $("#txtSellerAddress").val("");
  $("#txtSellerPincode").val("");
  $("#txtSellerEmail").val("");
  $("#txtSellerType").val("N");
  $("#txtSellerKey").val("0");
  $("#modal").addClass("is-active");
});
$("#btnSellerSave").click(function() {
  if ($("#txtSellerType").val() == 'N') {
    database.ref('sellers').once("value").then(function(snapshot) {
      new_seller_data($("#txtSellerName").val(), $("#txtSellerCompanyName").val(), $("#txtSellerPhoneNumber").val(), $("#txtSellerWhatsappNumber").val(), $("#txtSellerAddress").val(), $("#txtSellerPincode").val(), $("#txtSellerEmail").val(), $("#txtSellerPhoneNumber").val());
    });
  } else {
    update_seller_data($("#txtSellerName").val(), $("#txtSellerCompanyName").val(), $("#txtSellerPhoneNumber").val(), $("#txtSellerWhatsappNumber").val(), $("#txtSellerAddress").val(), $("#txtSellerPincode").val(), $("#txtSellerEmail").val(), $("#txtSellerPhoneNumber").val());
  }
  $("#btnSellerClose").click();
});
$(document).on("click", ".btnEdit", function(event) {
  event.preventDefault();
  key = $(this).attr("data-key");
  database.ref('sellers/' + key).once("value").then(function(snapshot) {
    $("#txtSellerName").val(snapshot.val().sellername);
    $("#txtSellerCompanyName").val(snapshot.val().companyname);
    $("#txtSellerPhoneNumber").val(snapshot.val().phonenumber);
    $("#txtSellerWhatsappNumber").val(snapshot.val().whatsappnumber);
    $("#txtSellerAddress").val(snapshot.val().address);
    $("#txtSellerPincode").val(snapshot.val().pincode);
    $("#txtSellerEmail").val(snapshot.val().email);
    $("#txtSellerType").val("E");
    $("#txtSellerKey").val(key);
  });
  $("#modal").addClass("is-active");
});
$(document).on("click", ".btnRemove", function(event) {
  event.preventDefault();
  key = $(this).attr("data-key");
  database.ref('sellers/' + key).remove();
})
$("#btnSellerClose,.btnSellerClose").click(function() {
  $("#modal").removeClass("is-active");
});
/*******seller management ends************/
//showcategorydata
var categoryarray = [];
var subcategoryarray = [];
var companynames = [];
var itemcodes = [];
var customerNumbers = [];
var currentunitconfig = "";
function showcategorydata(name, type) {
  if (type == "Category") {
    categoryarray.push(name);
  } else if (type == "Sub-Category") {
    subcategoryarray.push(name);
  }
}
function showcompanyname(name) {
  companynames.push(name);
}
function showcustomernumber(name) {
  customerNumbers.push(name);
}
function showitemcodes(code) {
  itemcodes.push(code);
}
function getunitconfig(unit) {
  currentunitconfig = unit;
}
//Add values to categories and subcategories array
database.ref('categories').on('child_added', function(data) {
  showcategorydata(data.val().name, data.val().type);
});
//Add values to company array
database.ref('sellers').on('child_added', function(data) {
  showcompanyname(data.val().companyname);
});
//Add values to customers array
database.ref('customers').on('child_added', function(data) {
  showcustomernumber(data.val().phonenumber);
});
//Add values to itemcode array
database.ref('products').on('child_added', function(data) {
  showitemcodes(data.val().itemcode + '|' + data.val().name);
});
function returnCurrentUnit() {
  $('#showunitsdiv').empty();
  database.ref('products').on('child_added', function(data) {
    var itemcode = $("#itemcode").val();

    if (data.val().itemcode == itemcode) {
      $('#productname').val(data.val().name);
      getunitconfig(data.val().unit);
    }
  });
  if (currentunitconfig == "Case-Tin") {

    $("#showunitsdiv").append('Case: <input id="case" type="text" placeholder="Case"/> Tin: <input id="tin" type="text" placeholder="Tin"/>');
  } else if (currentunitconfig == "Case-Piece") {

    $("#showunitsdiv").append('Case: <input id="case" type="text" placeholder="Case"/> Piece: <input id="piece" type="text" placeholder="Piece"/>');
  } else if (currentunitconfig == "Case-Box-Piece") {

    $("#showunitsdiv").append('Case: <input id="case" type="text" placeholder="Case"/> Box: <input id="box" type="text" placeholder="Box"/> Piece: <input id="piece" type="text" placeholder="Piece"/>');
  } else if (currentunitconfig == "Case-Packets") {

    $("#showunitsdiv").append('Case: <input id="case" type="text" placeholder="Case"/> Packets: <input id="packets" type="text" placeholder="Packets"/>');
  } else if (currentunitconfig == "Bundle-Katta-Boxes") {

    $("#showunitsdiv").append('Bundle: <input id="bundle" type="text" placeholder="Bundle"/> Katta: <input id="katta" type="text" placeholder="Katta"/>Box: <input id="box" type="text" placeholder="Box"/>');
  } else if (currentunitconfig == "Bundle-Boxes") {

    $("#showunitsdiv").append('Bundle: <input id="bundle" type="text" placeholder="Bundle"/> Box: <input id="box" type="text" placeholder="Box"/>');
  } else if (currentunitconfig == "Bag-Kgs") {

    $("#showunitsdiv").append('Bag: <input id="bag" type="text" placeholder="Bag"/> Kgs: <input id="kgs" type="text" placeholder="Kgs"/>');
  } else if (currentunitconfig == "Case-Cent-Katta") {

    $("#showunitsdiv").append('Case: <input id="case" type="text" placeholder="Case"/> Cent: <input id="cent" type="text" placeholder="Cent"/> Katta: <input id="katta" type="text" placeholder="Katta"/>');
  } else if (currentunitconfig == "Case-Tube") {

    $("#showunitsdiv").append('Case: <input id="case" type="text" placeholder="Case"/> Tube: <input id="tube" type="text" placeholder="Tube"/>');
  } else if (currentunitconfig == "Case-Cone") {

    $("#showunitsdiv").append('Case: <input id="case" type="text" placeholder="Case"/> Cone: <input id="cone" type="text" placeholder="Cone"/>');
  } else if (currentunitconfig == "Bag-Pieces") {

    $("#showunitsdiv").append('Bag: <input id="bag" type="text" placeholder="Bag"/> Piece: <input id="piece" type="text" placeholder="Piece"/>');
  } else if (currentunitconfig == "Bag-Packets") {

    $("#showunitsdiv").append('Bag: <input id="bag" type="text" placeholder="Bag"/> Packets: <input id="packets" type="text" placeholder="Packets"/>');
  } else {
    $("#showunitsdiv").append('<h1>Issue in selection</h1>');
  }
  //$("#showunitsdiv").append('<h1>'+currentunitconfig+'</h1>')
  console.log($("#itemcode").val() + " " + currentunitconfig);
}
/* Autocomplete */
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /* execute a function when someone writes in the text field: */
  inp.addEventListener("input", function(e) {
    var a,
      b,
      i,
      val = this.value;
    /* close any already open lists of autocompleted values */
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /* create a DIV element that will contain the items (values): */
    /* document.getElementById('autocompletetagshere').appendChild("DIV"); */

    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /* append the DIV element as a child of the autocomplete container: */
    document.getElementById('autocompletetagshere').appendChild(a);
    /* for each item in the array... */
    for (i = 0; i < arr.length; i++) {
      /* check if the item starts with the same letters as the text field value: */
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /* create a DIV element for each matching element: */
        b = document.createElement("DIV");
        /* make the matching letters bold: */
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /* insert a input field that will hold the current array item's value: */
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /* execute a function when someone clicks on the item value (DIV element): */
        b.addEventListener("click", function(e) {
          /* insert the value for the autocomplete text field: */
          inp.value = this.getElementsByTagName("input")[0].value;
          inp.value = inp.value.split("|")[0]
          console.log("Value is " + inp.value);
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /* execute a function presses a key on the keyboard: */
  inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x)
      x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /* and and make the current item more visible: */
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /* and and make the current item more visible: */
      addActive(x);
    } else if (e.keyCode == 13) {
      /* If the ENTER key is pressed, prevent the form from being submitted, */
      e.preventDefault();
      if (currentFocus > -1) {
        /* and simulate a click on the "active" item: */
        if (x)
          x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /* a function to classify an item as "active": */
    if (!x)
      return false;

    /* start by removing the "active" class on all items: */
    removeActive(x);
    if (currentFocus >= x.length)
      currentFocus = 0;
    if (currentFocus < 0)
      currentFocus = (x.length - 1);

    /* add class "autocomplete-active": */
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /* a function to remove the "active" class from all autocomplete items: */
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /* execute a function when someone clicks in the document: */
  document.addEventListener("click", function(e) {
    closeAllLists(e.target);
  });
}
database.ref('categories').on('child_added', function(data) {
  add_categories_data_table(data.val().name, data.val().type);
});
database.ref('categories').on('child_changed', function(data) {
  update_categories_data_table(data.val().name, data.val().type);
});
database.ref('categories').on('child_removed', function(data) {
  remove_categories_data_table(data.key)
});
function add_categories_data_table(name, type) {
  $("#Catcustable").prepend('<tr id="' + name + '"><th>' + name + '</th><th>' + type + '</th><th><a href="#" data-key="' + name + '" class="card-footer-item btnCatEdit">Edit</a></th><th><a href="#" class="card-footer-item btnCatRemove"  data-key="' + name + '">Remove</a></th></tr>');
}
function update_categories_data_table(name, type) {
  $("#Catcustable #" + name).html('<th>' + name + '</th><th>' + type + '</th><th><a href="#" data-key="' + name + '" class="card-footer-item btnCatEdit">Edit</a></th><th><a href="#" class="card-footer-item btnCatRemove"  data-key="' + name + '">Remove</a></th>');
}
function remove_categories_data_table(name) {
  $("#Catcustable #" + name).remove();
}
function new_category_data(name, type) {
  database.ref('categories/' + name).set({name: name, type: type});
}
function update_category_data(name, type) {
  database.ref('categories/' + name).update({name: name, type: type});
  console.log(name);
}
$("#btnCatAdd").click(function() {});
$("#btnCatSave").click(function() {
  if ($("#txtType").val() == 'N') {
    database.ref('categories').once("value").then(function(snapshot) {

      new_category_data($("#txtCatname").val(), $("#txtCattype").val());
    });
  } else {
    update_category_data($("#txtCatname").val(), $("#txtCattype").val());
    //window.location.reload();
  }
});
$(document).on("click", ".btnCatEdit", function(event) {
  event.preventDefault();
  key = $(this).attr("data-key");
  console.log("key is " + key);
  database.ref('categories/' + key).once("value").then(function(snapshot) {
    $("#txtCatname").val(snapshot.val().name);
    $("#txtCattype").val(snapshot.val().type);
  });
});
$(document).on("click", ".btnCatRemove", function(event) {
  event.preventDefault();
  key = $(this).attr("data-key");
  database.ref('categories/' + key).remove();
})
/********Add products logic****/
database.ref('products').on('child_added', function(data) {
  add_products_data_table(data.val().name, data.val().itemcode, data.val().companyname, data.val().category, data.val().subcategory, data.val().unit, data.val().comment);
});
database.ref('products').on('child_changed', function(data) {
  update_products_data_table(data.val().name, data.val().itemcode, data.val().companyname, data.val().category, data.val().subcategory, data.val().unit, data.val().comment);
  updateConfigProductTableInstantly(data);

});
database.ref('products').on('child_removed', function(data) {
  remove_products_data_table(data.key)
});
function add_products_data_table(name, itemcode, companyname, category, subcategory, unit, comment) {
  $("#ProductTable").prepend('<tr id="' + itemcode + '"><th>' + name + '</th><th>' + itemcode + '</th><th>' + companyname + '</th><th>' + category + '</th><th>' + subcategory + '</th><th>' + unit + '</th><th>' + comment + '</th><th><a href="#" data-key="' + itemcode + '" class="card-footer-item btnProductEdit">Edit</a></th><th><a href="#" class="card-footer-item btnProductRemove"  data-key="' + itemcode + '">Remove</a></th></tr>');
}
function update_products_data_table(name, itemcode, companyname, category, subcategory, unit, comment) {
  $("#ProductTable #" + itemcode).html('<th>' + name + '</th><th>' + itemcode + '</th><th>' + companyname + '</th><th>' + category + '</th><th>' + subcategory + '</th><th>' + unit + '</th><th>' + comment + '</th><th><a href="#" data-key="' + itemcode + '" class="card-footer-item btnProductEdit">Edit</a></th><th><a href="#" class="card-footer-item btnProductRemove"  data-key="' + itemcode + '">Remove</a></th>');
}
function remove_products_data_table(itemcode) {
  $("#ProductTable #" + itemcode).remove();
}
function new_product_data(name, itemcode, companyname, category, subcategory, unit, comment) {
  database.ref('products/' + itemcode).set({
    name: name,
    itemcode: itemcode,
    companyname: companyname,
    category: category,
    subcategory: subcategory,
    unit: unit,
    comment: comment
  });
  database.ref('inventory/' + itemcode).set({itemcode: itemcode, unit: unit, name: name,companyname: companyname,category:category,subcategory:subcategory});
  database.ref('purchaseorder/' + itemcode).set({itemcode: itemcode, unit: unit, name: name});
}
function update_product_data(name, itemcode, companyname, category, subcategory, unit, comment) {
  database.ref('products/' + itemcode).update({
    name: name,
    itemcode: itemcode,
    companyname: companyname,
    category: category,
    subcategory: subcategory,
    unit: unit,
    comment: comment
  });
  database.ref('inventory/' + itemcode).update({itemcode: itemcode, unit: unit, name: name,companyname: companyname,category:category,subcategory:subcategory});
  database.ref('purchaseorder/' + itemcode).update({itemcode: itemcode, unit: unit, name: name});
}
$("#btnProductAdd").click(function() {});
$("#btnProductSave").click(function() {
  if ($("#txtType").val() == 'N') {
    database.ref('products').once("value").then(function(snapshot) {
      new_product_data($("#productname").val(), $("#itemcode").val(), $("#companynameInput").val(), $("#categoriesInput").val(), $("#subcategoriesInput").val(), $("#unitconversion").val(), $("#itemcomment").val());
    });
    $("#productname").val("");
    $("#itemcode").val("");
    $("#companynameInput").val("");
    $("#categoriesInput").val("");
    $("#subcategoriesInput").val("");
    $("#unitconversion").val("");
    $("#itemcomment").val("");
  } else {

    update_product_data($("#productname").val(), $("#itemcode").val(), $("#companynameInput").val(), $("#categoriesInput").val(), $("#subcategoriesInput").val(), $("#unitconversion").val(), $("#itemcomment").val());
    //window.location.reload();
    $("#productname").val("");
    $("#itemcode").val("");
    $("#companynameInput").val("");
    $("#categoriesInput").val("");
    $("#subcategoriesInput").val("");
    $("#unitconversion").val("");
    $("#itemcomment").val("");
  }
});
$(document).on("click", ".btnProductEdit", function(event) {
  event.preventDefault();
  key = $(this).attr("data-key");
  console.log("key is " + key);
  database.ref('products/' + key).once("value").then(function(snapshot) {
    $("#productname").val(snapshot.val().name);
    $("#itemcode").val(snapshot.val().itemcode);
    $("#companynameInput").val(snapshot.val().companyname);
    $("#categoriesInput").val(snapshot.val().category);
    $("#subcategoriesInput").val(snapshot.val().subcategory);
    $("#unitconversion").val(snapshot.val().unit);
    $("#itemcomment").val(snapshot.val().comment);
  });
});
$(document).on("click", ".btnProductRemove", function(event) {
  event.preventDefault();
  key = $(this).attr("data-key");
  database.ref('products/' + key).remove();
})
/***Add product logic ends*/
/** configure product logic starts here **/
function updateConfigProductTableInstantly(data) {
  console.log("UCPTI" + data.val().category);
  switch (data.val().unit) {
    case "Case-Box-Piece":
      if ($('#ProductConfigureTable').find('#' + data.val().itemcode).length > 0) {
        $("#ProductConfigureTable #" + data.val().itemcode).html('<th>' + data.val().itemcode + '</th><th>Case: ' + data.val().case + ' Box: ' + data.val().box + ' Piece: ' + data.val().piece + '</th><th>' + data.val().price + '</th><th>' + data.val().wholesalepercent + '</th><th>' + data.val().semiwholesalepercent + '</th><th>' + data.val().retailpercent + '</th>');

      } else {
        add_config_product_CaseBoxPiece_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().case, data.val().box, data.val().piece, data.val().itemcode);
      }
      break;
    case "Case-Piece":
      if ($('#ProductConfigureTable').find('#' + data.val().itemcode).length > 0) {
        $("#ProductConfigureTable #" + data.val().itemcode).html('<th>' + data.val().itemcode + '</th><th>Case: ' + data.val().case + ' Piece: ' + data.val().piece + '</th><th>' + data.val().price + '</th><th>' + data.val().wholesalepercent + '</th><th>' + data.val().semiwholesalepercent + '</th><th>' + data.val().retailpercent + '</th>');
      } else {
        console.log("table row " + data.val().itemcode);
        add_config_product_CasePiece_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().case, data.val().piece, data.val().itemcode);
      }
      console.log("its c-p");
      break;
    case "Case-Packets":
      console.log("its c-pkts");
      if ($('#ProductConfigureTable').find('#' + data.val().itemcode).length > 0) {
        $("#ProductConfigureTable #" + data.val().itemcode).html('<th>' + data.val().itemcode + '</th><th>Case: ' + data.val().case + ' Packets: ' + data.val().packets + '</th><th>' + data.val().price + '</th><th>' + data.val().wholesalepercent + '</th><th>' + data.val().semiwholesalepercent + '</th><th>' + data.val().retailpercent + '</th>');

      } else {
        add_config_product_CasePackets_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().case, data.val().packets, data.val().itemcode);
      }
      break;
    case "Case-Tin":
      console.log("its c-t");
      if ($('#ProductConfigureTable').find('#' + data.val().itemcode).length > 0) {
        $("#ProductConfigureTable #" + data.val().itemcode).html('<th>' + data.val().itemcode + '</th><th>Case: ' + data.val().case + ' Tin: ' + data.val().tin + '</th><th>' + data.val().price + '</th><th>' + data.val().wholesalepercent + '</th><th>' + data.val().semiwholesalepercent + '</th><th>' + data.val().retailpercent + '</th>');
      } else {
        add_config_product_CaseTin_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().case, data.val().tin, data.val().itemcode);
      }
      break;
    case "Bundle-Katta-Boxes":
      console.log("its b-k-b");
      if ($('#ProductConfigureTable').find('#' + data.val().itemcode).length > 0) {
        $("#ProductConfigureTable #" + data.val().itemcode).html('<th>' + data.val().itemcode + '</th><th>Bundle: ' + data.val().bundle + ' Katta: ' + data.val().katta + ' Box: ' + data.val().box + '</th><th>' + data.val().price + '</th><th>' + data.val().wholesalepercent + '</th><th>' + data.val().semiwholesalepercent + '</th><th>' + data.val().retailpercent + '</th>');
      } else {
        add_config_product_BundleKattaBox_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().bundle, data.val().katta, data.val().box, data.val().itemcode);
      }
      break;
    case "Bundle-Boxes":
      console.log("its b-b");
      if ($('#ProductConfigureTable').find('#' + data.val().itemcode).length > 0) {
        $("#ProductConfigureTable #" + data.val().itemcode).html('<th>' + data.val().itemcode + '</th><th>Bundle: ' + data.val().bundle + ' Box: ' + data.val().box + '</th><th>' + data.val().price + '</th><th>' + data.val().wholesalepercent + '</th><th>' + data.val().semiwholesalepercent + '</th><th>' + data.val().retailpercent + '</th>');

      } else {
        add_config_product_BundleBox_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().bundle, data.val().box, data.val().itemcode);

      }
      break;
    case "Bag-Kgs":
      console.log("its bag-kgs");
      if ($('#ProductConfigureTable').find('#' + data.val().itemcode).length > 0) {
        $("#ProductConfigureTable #" + data.val().itemcode).html('<th>' + data.val().itemcode + '</th><th>Bag: ' + data.val().bag + ' Kgs: ' + data.val().kgs + '</th><th>' + data.val().price + '</th><th>' + data.val().wholesalepercent + '</th><th>' + data.val().semiwholesalepercent + '</th><th>' + data.val().retailpercent + '</th>');
      } else {
        add_config_product_BagKgs_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().bag, data.val().kgs, data.val().itemcode);
      }
      break;
    case "Case-Cent-Katta":
      console.log("Its c-c-k");
      if ($('#ProductConfigureTable').find('#' + data.val().itemcode).length > 0) {
        $("#ProductConfigureTable #" + data.val().itemcode).html('<th>' + data.val().itemcode + '</th><th>Case: ' + data.val().case + ' Cent: ' + data.val().cent + ' Katta: ' + data.val().katta + '</th><th>' + data.val().price + '</th><th>' + data.val().wholesalepercent + '</th><th>' + data.val().semiwholesalepercent + '</th><th>' + data.val().retailpercent + '</th>');
      } else {
        add_config_product_CaseCentKatta_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().case, data.val().cent, data.val().katta, data.val().itemcode);
      }
      break;
    case "Case-Tube":
      console.log("its c-tb");
      if ($('#ProductConfigureTable').find('#' + data.val().itemcode).length > 0) {
        $("#ProductConfigureTable #" + data.val().itemcode).html('<th>' + data.val().itemcode + '</th><th>Case: ' + data.val().case + ' Tube: ' + data.val().tube + '</th><th>' + data.val().price + '</th><th>' + data.val().wholesalepercent + '</th><th>' + data.val().semiwholesalepercent + '</th><th>' + data.val().retailpercent + '</th>');
      } else {
        add_config_product_CaseTube_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().case, data.val().tube, data.val().itemcode);
      }
      break;
    case "Case-Cone":
      console.log("its c-c");
      if ($('#ProductConfigureTable').find('#' + data.val().itemcode).length > 0) {
        $("#ProductConfigureTable #" + data.val().itemcode).html('<th>' + data.val().itemcode + '</th><th>Case: ' + data.val().case + ' Cone: ' + data.val().cone + '</th><th>' + data.val().price + '</th><th>' + data.val().wholesalepercent + '</th><th>' + data.val().semiwholesalepercent + '</th><th>' + data.val().retailpercent + '</th>');

      } else {
        console.log("table row " + data.val().itemcode);
        add_config_product_CaseCone_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().case, data.val().cone, data.val().itemcode);
      }
      break;
    case "Bag-Packets":
      console.log("its b-pkts");
      if ($('#ProductConfigureTable').find('#' + data.val().itemcode).length > 0) {
        $("#ProductConfigureTable #" + data.val().itemcode).html('<th>' + data.val().itemcode + '</th><th>Bag: ' + data.val().bag + ' Packets: ' + data.val().packets + '</th><th>' + data.val().price + '</th><th>' + data.val().wholesalepercent + '</th><th>' + data.val().semiwholesalepercent + '</th><th>' + data.val().retailpercent + '</th>');

      } else {
        add_config_product_BagPackets_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().bag, data.val().packets, data.val().itemcode);
      }
      break;
    case "Bag-Pieces":
      console.log("its b-pcs");
      if ($('#ProductConfigureTable').find('#' + data.val().itemcode).length > 0) {
        $("#ProductConfigureTable #" + data.val().itemcode).html('<th>' + data.val().itemcode + '</th><th>Bag: ' + data.val().bag + ' Pieces: ' + data.val().piece + '</th><th>' + data.val().price + '</th><th>' + data.val().wholesalepercent + '</th><th>' + data.val().semiwholesalepercent + '</th><th>' + data.val().retailpercent + '</th>');
      } else {
        add_config_product_BagPieces_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().bag, data.val().piece, data.val().itemcode);
      }
      break;
    default:
      console.log("No package found");
  }
}
$("#btnProductConfigSave").click(function() {
  switch (currentunitconfig) {
    case "Case-Box-Piece":
      database.ref('products').once("value").then(function(snapshot) {
        new_config_product_CaseBoxPiece($("#productconfigprice").val(), $("#wholesalepercent").val(), $("#semiwholesalepercent").val(), $("#retailpercent").val(), $("#case").val(), $("#box").val(), $("#piece").val(), $("#itemcode").val());
      });

      break;
    case "Case-Piece":
      database.ref('products').once("value").then(function(snapshot) {
        new_config_product_CasePiece($("#productconfigprice").val(), $("#wholesalepercent").val(), $("#semiwholesalepercent").val(), $("#retailpercent").val(), $("#case").val(), $("#piece").val(), $("#itemcode").val());
      });
      break;
    case "Case-Packets":
      database.ref('products').once("value").then(function(snapshot) {
        new_config_product_CasePackets($("#productconfigprice").val(), $("#wholesalepercent").val(), $("#semiwholesalepercent").val(), $("#retailpercent").val(), $("#case").val(), $("#packets").val(), $("#itemcode").val());
      });
      break;
    case "Case-Tin":
      database.ref('products').once("value").then(function(snapshot) {
        new_config_product_CaseTin($("#productconfigprice").val(), $("#wholesalepercent").val(), $("#semiwholesalepercent").val(), $("#retailpercent").val(), $("#case").val(), $("#tin").val(), $("#itemcode").val());
      });
      break;
    case "Bundle-Katta-Boxes":
      database.ref('products').once("value").then(function(snapshot) {
        new_config_product_BundleKattaBox($("#productconfigprice").val(), $("#wholesalepercent").val(), $("#semiwholesalepercent").val(), $("#retailpercent").val(), $("#bundle").val(), $("#katta").val(), $("#box").val(), $("#itemcode").val());
      });
      break;
    case "Bundle-Boxes":
      database.ref('products').once("value").then(function(snapshot) {
        new_config_product_BundleBox($("#productconfigprice").val(), $("#wholesalepercent").val(), $("#semiwholesalepercent").val(), $("#retailpercent").val(), $("#bundle").val(), $("#box").val(), $("#itemcode").val());
      });
      break;
    case "Bag-Kgs":
      database.ref('products').once("value").then(function(snapshot) {
        new_config_product_BagKgs($("#productconfigprice").val(), $("#wholesalepercent").val(), $("#semiwholesalepercent").val(), $("#retailpercent").val(), $("#bag").val(), $("#kgs").val(), $("#itemcode").val());
      });
      break;
    case "Case-Cent-Katta":
      database.ref('products').once("value").then(function(snapshot) {
        new_config_product_CaseCentKatta($("#productconfigprice").val(), $("#wholesalepercent").val(), $("#semiwholesalepercent").val(), $("#retailpercent").val(), $("#case").val(), $("#cent").val(), $("#katta").val(), $("#itemcode").val());
      });
      break;
    case "Case-Tube":
      database.ref('products').once("value").then(function(snapshot) {
        new_config_product_CaseTube($("#productconfigprice").val(), $("#wholesalepercent").val(), $("#semiwholesalepercent").val(), $("#retailpercent").val(), $("#case").val(), $("#tube").val(), $("#itemcode").val());
      });
      break;
    case "Case-Cone":
      /*database.ref('products').once("value").then(function(snapshot) {
      new_config_product_CaseCone($("#productconfigprice").val(), $("#wholesalepercent").val(), $("#semiwholesalepercent").val(), $("#retailpercent").val(), $("#case").val(), $("#cone").val(), $("#itemcode").val());
    });*/
      new_config_product_CaseCone($("#productconfigprice").val(), $("#wholesalepercent").val(), $("#semiwholesalepercent").val(), $("#retailpercent").val(), $("#case").val(), $("#cone").val(), $("#itemcode").val());
      //add_config_product_CaseCone_data_table($("#productconfigprice").val(), $("#wholesalepercent").val(), $("#semiwholesalepercent").val(), $("#retailpercent").val(), $("#case").val(), $("#cone").val(), $("#itemcode").val());
      //$('#ProductConfigureTable').html(response);
      break;
    case "Bag-Packets":
      database.ref('products').once("value").then(function(snapshot) {
        new_config_product_BagPackets($("#productconfigprice").val(), $("#wholesalepercent").val(), $("#semiwholesalepercent").val(), $("#retailpercent").val(), $("#bag").val(), $("#packets").val(), $("#itemcode").val());
      });
      break;
    case "Bag-Pieces":
      database.ref('products').once("value").then(function(snapshot) {
        new_config_product_BagPieces($("#productconfigprice").val(), $("#wholesalepercent").val(), $("#semiwholesalepercent").val(), $("#retailpercent").val(), $("#bag").val(), $("#piece").val(), $("#itemcode").val());
      });
      break;
    default:
      console.log("No package found");
  }
  //new_productConfig_data($("#productname").val(), $("#itemcode").val(), $("#companynameInput").val(), $("#categoriesInput").val(), $("#subcategoriesInput").val(), $("#unitconversion").val(), $("#itemcomment").val());

});
database.ref('products').on('child_added', function(data) {
  switch (data.val().unit) {
    case "Case-Box-Piece":
      if (data.val().box != undefined) {
        add_config_product_CaseBoxPiece_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().case, data.val().box, data.val().piece, data.val().itemcode);
      }
      break;
    case "Case-Piece":
      console.log("case,piece " + data.val().piece);
      if (data.val().piece != undefined) {
        console.log("in if");
        add_config_product_CasePiece_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().case, data.val().piece, data.val().itemcode);
      }
      break;
    case "Case-Packets":
      if (data.val().packets != undefined) {
        add_config_product_CasePackets_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().case, data.val().packets, data.val().itemcode);
      }
      break;
    case "Case-Tin":
      if (data.val().tin != undefined) {
        add_config_product_CaseTin_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().case, data.val().tin, data.val().itemcode);
      }
      break;
    case "Bundle-Katta-Boxes":
      if (data.val().box != undefined) {
        add_config_product_BundleKattaBox_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().bundle, data.val().katta, data.val().box, data.val().itemcode);
      }
      break;
    case "Bundle-Boxes":
      if (data.val().box != undefined) {
        add_config_product_BundleBox_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().bundle, data.val().box, data.val().itemcode);
      }
      break;
    case "Bag-Kgs":
      if (data.val().bag != undefined) {
        add_config_product_BagKgs_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().bag, data.val().kgs, data.val().itemcode);
      }
      break;
    case "Case-Cent-Katta":
      if (data.val().cent != undefined) {
        add_config_product_CaseCentKatta_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().case, data.val().cent, data.val().katta, data.val().itemcode);
      }
      break;
    case "Case-Tube":
      if (data.val().tube != undefined) {
        add_config_product_CaseTube_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().case, data.val().tube, data.val().itemcode);
      }
      break;
    case "Case-Cone":
      if (data.val().cone != undefined) {
        add_config_product_CaseCone_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().case, data.val().cone, data.val().itemcode);
      }
      break;
    case "Bag-Packets":
      if (data.val().bag != undefined) {
        add_config_product_BagPackets_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().bag, data.val().packets, data.val().itemcode);
      }
      break;
    case "Bag-Pieces":
      if (data.val().bag != undefined) {
        add_config_product_BagPieces_data_table(data.val().price, data.val().wholesalepercent, data.val().semiwholesalepercent, data.val().retailpercent, data.val().bag, data.val().piece, data.val().itemcode);
      }
      break;
    default:
      console.log("No package found");
  }
});
function add_config_product_CaseBoxPiece_data_table(price, wholesalepercent, semiwholesalepercent, retailpercent, caseunit, box, piece, itemcode) {
  $("#ProductConfigureTable").prepend('<tr id="' + itemcode + '"><th>' + itemcode + '</th><th>Case : ' + caseunit + ' Box : ' + box + ' Piece : ' + piece + '</th><th>' + price + '</th><th>' + wholesalepercent + '</th><th>' + semiwholesalepercent + '</th><th>' + retailpercent + '</th></tr>');
}
function add_config_product_CasePiece_data_table(price, wholesalepercent, semiwholesalepercent, retailpercent, caseunit, piece, itemcode) {
  $("#ProductConfigureTable").prepend('<tr id="' + itemcode + '"><th>' + itemcode + '</th><th>Case : ' + caseunit + ' Piece : ' + piece + '</th><th>' + price + '</th><th>' + wholesalepercent + '</th><th>' + semiwholesalepercent + '</th><th>' + retailpercent + '</th></tr>');
}
function add_config_product_CasePackets_data_table(price, wholesalepercent, semiwholesalepercent, retailpercent, caseunit, packets, itemcode) {
  $("#ProductConfigureTable").prepend('<tr id="' + itemcode + '"><th>' + itemcode + '</th><th>Case : ' + caseunit + ' Packets : ' + packets + '</th><th>' + price + '</th><th>' + wholesalepercent + '</th><th>' + semiwholesalepercent + '</th><th>' + retailpercent + '</th></tr>');
}
function add_config_product_CaseTin_data_table(price, wholesalepercent, semiwholesalepercent, retailpercent, caseunit, tin, itemcode) {
  $("#ProductConfigureTable").prepend('<tr id="' + itemcode + '"><th>' + itemcode + '</th><th>Case : ' + caseunit + ' Tin : ' + tin + '</th><th>' + price + '</th><th>' + wholesalepercent + '</th><th>' + semiwholesalepercent + '</th><th>' + retailpercent + '</th></tr>');
}
function add_config_product_BundleKattaBox_data_table(price, wholesalepercent, semiwholesalepercent, retailpercent, bundle, katta, box, itemcode) {
  $("#ProductConfigureTable").prepend('<tr id="' + itemcode + '"><th>' + itemcode + '</th><th>Bundle : ' + bundle + ' Katta : ' + katta + ' Box : ' + box + '</th><th>' + price + '</th><th>' + wholesalepercent + '</th><th>' + semiwholesalepercent + '</th><th>' + retailpercent + '</th></tr>');
}
function add_config_product_BundleBox_data_table(price, wholesalepercent, semiwholesalepercent, retailpercent, bundle, box, itemcode) {
  $("#ProductConfigureTable").prepend('<tr id="' + itemcode + '"><th>' + itemcode + '</th><th>Bundle : ' + bundle + ' Box : ' + box + '</th><th>' + price + '</th><th>' + wholesalepercent + '</th><th>' + semiwholesalepercent + '</th><th>' + retailpercent + '</th></tr>');
}
function add_config_product_BagKgs_data_table(price, wholesalepercent, semiwholesalepercent, retailpercent, bag, kgs, itemcode) {
  $("#ProductConfigureTable").prepend('<tr id="' + itemcode + '"><th>' + itemcode + '</th><th>Bag : ' + bag + ' Kgs : ' + kgs + '</th><th>' + price + '</th><th>' + wholesalepercent + '</th><th>' + semiwholesalepercent + '</th><th>' + retailpercent + '</th></tr>');
}
function add_config_product_CaseCentKatta_data_table(price, wholesalepercent, semiwholesalepercent, retailpercent, caseunit, cent, katta, itemcode) {
  $("#ProductConfigureTable").prepend('<tr id="' + itemcode + '"><th>' + itemcode + '</th><th>Case : ' + caseunit + ' Cent : ' + cent + ' Katta : ' + katta + '</th><th>' + price + '</th><th>' + wholesalepercent + '</th><th>' + semiwholesalepercent + '</th><th>' + retailpercent + '</th></tr>');
}
function add_config_product_CaseTube_data_table(price, wholesalepercent, semiwholesalepercent, retailpercent, caseunit, tube, itemcode) {
  $("#ProductConfigureTable").prepend('<tr id="' + itemcode + '"><th>' + itemcode + '</th><th>Case : ' + caseunit + ' Tube : ' + tube + '</th><th>' + price + '</th><th>' + wholesalepercent + '</th><th>' + semiwholesalepercent + '</th><th>' + retailpercent + '</th></tr>');
}
function add_config_product_CaseCone_data_table(price, wholesalepercent, semiwholesalepercent, retailpercent, caseunit, cone, itemcode) {
  $("#ProductConfigureTable").prepend('<tr id="' + itemcode + '"><th>' + itemcode + '</th><th>Case : ' + caseunit + ' Cone : ' + cone + '</th><th>' + price + '</th><th>' + wholesalepercent + '</th><th>' + semiwholesalepercent + '</th><th>' + retailpercent + '</th></tr>');
}
function add_config_product_BagPackets_data_table(price, wholesalepercent, semiwholesalepercent, retailpercent, bag, packets, itemcode) {
  $("#ProductConfigureTable").prepend('<tr id="' + itemcode + '"><th>' + itemcode + '</th><th>Bag : ' + bag + ' Packets : ' + packets + '</th><th>' + price + '</th><th>' + wholesalepercent + '</th><th>' + semiwholesalepercent + '</th><th>' + retailpercent + '</th></tr>');
}
function add_config_product_BagPieces_data_table(price, wholesalepercent, semiwholesalepercent, retailpercent, bag, piece, itemcode) {
  $("#ProductConfigureTable").prepend('<tr id="' + itemcode + '"><th>' + itemcode + '</th><th>Bag : ' + bag + ' Piece : ' + piece + '</th><th>' + price + '</th><th>' + wholesalepercent + '</th><th>' + semiwholesalepercent + '</th><th>' + retailpercent + '</th></tr>');
}
function new_config_product_CaseBoxPiece(price, wholesalepercent, semiwholesalepercent, retailpercent, caseunit, box, piece, itemcode) {
  database.ref('products/' + itemcode).update({
    itemcode: itemcode,
    price: price,
    wholesalepercent: wholesalepercent,
    semiwholesalepercent: semiwholesalepercent,
    retailpercent: retailpercent,
    case: caseunit,
    piece: piece,
    box: box
  });
  /*database.ref('inventory/' + itemcode).update({
    itemcode: itemcode
  });*/
}
function new_config_product_CasePiece(price, wholesalepercent, semiwholesalepercent, retailpercent, caseunit, piece, itemcode) {
  database.ref('products/' + itemcode).update({
    itemcode: itemcode,
    price: price,
    wholesalepercent: wholesalepercent,
    semiwholesalepercent: semiwholesalepercent,
    retailpercent: retailpercent,
    case: caseunit,
    piece: piece
  });
  //database.ref('inventory/' + itemcode).update({itemcode: itemcode});
}
function new_config_product_CasePackets(price, wholesalepercent, semiwholesalepercent, retailpercent, caseunit, packets, itemcode) {
  database.ref('products/' + itemcode).update({
    itemcode: itemcode,
    price: price,
    wholesalepercent: wholesalepercent,
    semiwholesalepercent: semiwholesalepercent,
    retailpercent: retailpercent,
    case: caseunit,
    packets: packets
  });
  //database.ref('inventory/' + itemcode).update({itemcode: itemcode});
}
function new_config_product_CaseTin(price, wholesalepercent, semiwholesalepercent, retailpercent, caseunit, tin, itemcode) {
  database.ref('products/' + itemcode).update({
    itemcode: itemcode,
    price: price,
    wholesalepercent: wholesalepercent,
    semiwholesalepercent: semiwholesalepercent,
    retailpercent: retailpercent,
    case: caseunit,
    tin: tin
  });
  //  database.ref('inventory/' + itemcode).update({itemcode: itemcode});
}
function new_config_product_BundleKattaBox(price, wholesalepercent, semiwholesalepercent, retailpercent, bundle, katta, box, itemcode) {
  database.ref('products/' + itemcode).update({
    itemcode: itemcode,
    price: price,
    wholesalepercent: wholesalepercent,
    semiwholesalepercent: semiwholesalepercent,
    retailpercent: retailpercent,
    bundle: bundle,
    katta: katta,
    box: box
  });
  //database.ref('inventory/' + itemcode).update({itemcode: itemcode});
}
function new_config_product_BundleBox(price, wholesalepercent, semiwholesalepercent, retailpercent, bundle, box, itemcode) {
  database.ref('products/' + itemcode).update({
    itemcode: itemcode,
    price: price,
    wholesalepercent: wholesalepercent,
    semiwholesalepercent: semiwholesalepercent,
    retailpercent: retailpercent,
    bundle: bundle,
    box: box
  });
  //database.ref('inventory/' + itemcode).update({itemcode: itemcode});
}
function new_config_product_BagKgs(price, wholesalepercent, semiwholesalepercent, retailpercent, bag, kgs, itemcode) {
  database.ref('products/' + itemcode).update({
    itemcode: itemcode,
    price: price,
    wholesalepercent: wholesalepercent,
    semiwholesalepercent: semiwholesalepercent,
    retailpercent: retailpercent,
    bag: bag,
    kgs: kgs
  });
  //  database.ref('inventory/' + itemcode).update({itemcode: itemcode});
}
function new_config_product_CaseCentKatta(price, wholesalepercent, semiwholesalepercent, retailpercent, caseunit, centunit, katta, itemcode) {
  database.ref('products/' + itemcode).update({
    itemcode: itemcode,
    price: price,
    wholesalepercent: wholesalepercent,
    semiwholesalepercent: semiwholesalepercent,
    retailpercent: retailpercent,
    case: caseunit,
    katta: katta,
    cent: centunit
  });
  //  database.ref('inventory/' + itemcode).update({itemcode: itemcode});
}
function new_config_product_CaseTube(price, wholesalepercent, semiwholesalepercent, retailpercent, caseunit, tube, itemcode) {
  database.ref('products/' + itemcode).update({
    itemcode: itemcode,
    price: price,
    wholesalepercent: wholesalepercent,
    semiwholesalepercent: semiwholesalepercent,
    retailpercent: retailpercent,
    case: caseunit,
    tube: tube
  });
  //  database.ref('inventory/' + itemcode).update({itemcode: itemcode});
}
function new_config_product_CaseCone(price, wholesalepercent, semiwholesalepercent, retailpercent, caseunit, cone, itemcode) {

  database.ref('products/' + itemcode).update({
    itemcode: itemcode,
    price: price,
    wholesalepercent: wholesalepercent,
    semiwholesalepercent: semiwholesalepercent,
    retailpercent: retailpercent,
    case: caseunit,
    cone: cone
  });
  //  database.ref('inventory/' + itemcode).update({itemcode: itemcode});
}
function new_config_product_BagPackets(price, wholesalepercent, semiwholesalepercent, retailpercent, bag, packets, itemcode) {
  database.ref('products/' + itemcode).update({
    itemcode: itemcode,
    price: price,
    wholesalepercent: wholesalepercent,
    semiwholesalepercent: semiwholesalepercent,
    retailpercent: retailpercent,
    bag: bag,
    packets: packets
  });
  //database.ref('inventory/' + itemcode).update({itemcode: itemcode});
}
function new_config_product_BagPieces(price, wholesalepercent, semiwholesalepercent, retailpercent, bag, piece, itemcode) {
  database.ref('products/' + itemcode).update({
    itemcode: itemcode,
    price: price,
    wholesalepercent: wholesalepercent,
    semiwholesalepercent: semiwholesalepercent,
    retailpercent: retailpercent,
    bag: bag,
    piece: piece
  });
  //database.ref('inventory/' + itemcode).update({itemcode: itemcode});
}
/** configure product logic ends here **/
/** Add items to inventory starts here**/

$("#btnAddItems").click(function() {
  switch (currentunitconfig) {
    case "Case-Box-Piece":
      //add_itemToInv_CaseBoxPiece_data($("#itemcode").val(), $("#case").val(), $("#box").val(), $("#piece").val());
      itemcodeadd = $("#itemcode").val();
      var caseunit = $("#case").val();
      var box = $("#box").val();
      var piece = $("#piece").val();
      var today = $("#today").val();
      database.ref('inventory/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().case)) {
          caseunitadd = "0";
        } else {
          caseunitadd = snapshot.val().case;
        }

        if (isNaN(snapshot.val().box)) {
          boxadd = "0";
        } else {

          boxadd = snapshot.val().box;
        }
        if (isNaN(snapshot.val().piece)) {
          pieceadd = "0";
        } else {

          pieceadd = snapshot.val().piece;
        }

        caseunitadd = parseInt(caseunitadd);
        boxadd = parseInt(boxadd);
        pieceadd = parseInt(pieceadd);
        caseunitadd = caseunitadd + parseInt(caseunit);
        pieceadd = pieceadd + parseInt(piece);
        boxadd = boxadd + parseInt(box);
        add_itemToInv_CaseBoxPiece_data(itemcodeadd, caseunitadd, boxadd, pieceadd, today);
      });
      break;
    case "Case-Piece":
      itemcodeadd = $("#itemcode").val();
      var caseunit = $("#case").val();
      var piece = $("#piece").val();
      var today = $("#today").val();
      database.ref('inventory/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().case)) {
          caseunitadd = "0";
        } else {
          caseunitadd = snapshot.val().case;
        }
        if (isNaN(snapshot.val().piece)) {
          pieceadd = "0";
        } else {
          pieceadd = snapshot.val().piece;
        }
        caseunitadd = parseInt(caseunitadd);
        pieceadd = parseInt(pieceadd);
        caseunitadd = caseunitadd + parseInt(caseunit);
        pieceadd = pieceadd + parseInt(piece);
        add_itemToInv_CasePiece_data(itemcodeadd, caseunitadd, pieceadd, today);
      });

      break;
    case "Case-Packets":
      //add_itemToInv_CasePackets_data($("#itemcode").val(), $("#case").val(),$("#packets").val());
      itemcodeadd = $("#itemcode").val();
      var caseunit = $("#case").val();
      var packets = $("#packets").val();
      var today = $("#today").val();
      database.ref('inventory/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().case)) {
          caseunitadd = "0";
        } else {
          caseunitadd = snapshot.val().case;
        }
        if (isNaN(snapshot.val().packets)) {
          packetsadd = "0";
        } else {
          packetsadd = snapshot.val().packets;
        }
        caseunitadd = parseInt(caseunitadd);
        packetsadd = parseInt(packetsadd);
        caseunitadd = caseunitadd + parseInt(caseunit);
        packetsadd = packetsadd + parseInt(packets);
        add_itemToInv_CasePackets_data(itemcodeadd, caseunitadd, packetsadd, today);
      });
      break;
    case "Case-Tin":
      //add_itemToInv_CaseTin_data($("#itemcode").val(), $("#case").val(),$("#tin").val());
      //Get item code
      itemcodeadd = $("#itemcode").val();
      //get units from input boxes
      var caseunit = $("#case").val();
      var tin = $("#tin").val();
      //Get date from input
      var today = $("#today").val();
      database.ref('inventory/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().case)) {
          caseunitadd = "0";
        } else {
          caseunitadd = snapshot.val().case;
        }
        if (isNaN(snapshot.val().tin)) {
          tinadd = "0";
        } else {
          tinadd = snapshot.val().tin;
        }
        //Convert input to int
        caseunitadd = parseInt(caseunitadd);
        tinadd = parseInt(tinadd);
        //Add inputs value db value
        caseunitadd = caseunitadd + parseInt(caseunit);
        tinadd = tinadd + parseInt(tin);
        add_itemToInv_CaseTin_data(itemcodeadd, caseunitadd, tinadd, today);
      });
      break;
    case "Bundle-Katta-Boxes":
      //add_itemToInv_BundleKattaBox_data($("#itemcode").val(), $("#bundle").val(), $("#katta").val(), $("#box").val());
      itemcodeadd = $("#itemcode").val();
      var bundle = $("#bundle").val();
      var box = $("#box").val();
      var katta = $("#katta").val();
      var today = $("#today").val();
      database.ref('inventory/' + itemcodeadd).once("value").then(function(snapshot) {

        if (isNaN(snapshot.val().bundle)) {
          bundleadd = "0";
        } else {
          bundleadd = snapshot.val().bundle;
        }

        if (isNaN(snapshot.val().box)) {
          boxadd = "0";
        } else {

          boxadd = snapshot.val().box;
        }
        if (isNaN(snapshot.val().katta)) {
          kattaadd = "0";
        } else {
          kattaadd = snapshot.val().katta;
        }

        bundleadd = parseInt(bundleadd);
        boxadd = parseInt(boxadd);
        kattaadd = parseInt(kattaadd);
        bundleadd = bundleadd + parseInt(bundle);
        kattaadd = kattaadd + parseInt(katta);
        boxadd = boxadd + parseInt(box);
        add_itemToInv_BundleKattaBox_data(itemcodeadd, bundleadd, kattaadd, boxadd, today);
      });
      break;
    case "Bundle-Boxes":
      //add_itemToInv_BundleBox_data($("#itemcode").val(), $("#bundle").val(),$("#box").val());
      itemcodeadd = $("#itemcode").val();
      var bundle = $("#bundle").val();
      var box = $("#box").val();
      var today = $("#today").val();
      database.ref('inventory/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().bundle)) {
          bundleadd = "0";
        } else {
          bundleadd = snapshot.val().bundle;
        }
        if (isNaN(snapshot.val().box)) {
          boxadd = "0";
        } else {
          boxadd = snapshot.val().box;
        }
        bundleadd = parseInt(bundleadd);
        boxadd = parseInt(boxadd);
        bundleadd = bundleadd + parseInt(bundle);
        boxadd = boxadd + parseInt(box);
        add_itemToInv_BundleBox_data(itemcodeadd, bundleadd, boxadd, today);
      });
      break;
    case "Bag-Kgs":
      //add_itemToInv_BagKgs_data($("#itemcode").val(), $("#bag").val(),$("#kgs").val());
      //Get item code
      itemcodeadd = $("#itemcode").val();
      //get units from input boxes
      var bag = $("#bag").val();
      var kgs = $("#kgs").val();
      //Get date from input
      var today = $("#today").val();
      database.ref('inventory/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().bag)) {
          bagadd = "0";
        } else {
          bagadd = snapshot.val().bag;
        }
        if (isNaN(snapshot.val().kgs)) {
          kgsadd = "0";
        } else {
          kgsadd = snapshot.val().kgs;
        }
        //Convert input to int
        bagadd = parseInt(bagadd);
        kgsadd = parseInt(kgsadd);
        //Add inputs value db value
        bagadd = bagadd + parseInt(bag);
        kgsadd = kgsadd + parseInt(kgs);
        add_itemToInv_BagKgs_data(itemcodeadd, bagadd, kgsadd, today);
      });
      break;
    case "Case-Cent-Katta":
      //  add_itemToInv_CaseCentKatta_data($("#itemcode").val(), $("#case").val(), $("#cent").val(), $("#katta").val());
      itemcodeadd = $("#itemcode").val();
      var caseunit = $("#case").val();
      var cent = $("#cent").val();
      var katta = $("#katta").val();
      var today = $("#today").val();
      database.ref('inventory/' + itemcodeadd).once("value").then(function(snapshot) {

        if (isNaN(snapshot.val().case)) {
          caseunitadd = "0";
        } else {
          caseunitadd = snapshot.val().case;
        }
        if (isNaN(snapshot.val().cent)) {
          centadd = "0";
        } else {

          centadd = snapshot.val().cent;
        }
        if (isNaN(snapshot.val().katta)) {
          kattaadd = "0";
        } else {
          kattaadd = snapshot.val().katta;
        }

        caseunitadd = parseInt(caseunitadd);
        centadd = parseInt(centadd);
        kattaadd = parseInt(kattaadd);
        caseunitadd = caseunitadd + parseInt(caseunit);
        centadd = centadd + parseInt(cent);
        kattaadd = kattaadd + parseInt(katta);
        add_itemToInv_CaseCentKatta_data(itemcodeadd, caseunitadd, centadd, kattaadd, today);
      });
      break;
      //Verified upto here
    case "Case-Tube":
      //add_itemToInv_CaseTube_data($("#itemcode").val(), $("#case").val(),$("#tube").val());
      //Get item code
      itemcodeadd = $("#itemcode").val();
      //get units from input boxes
      var caseunit = $("#case").val();
      var tube = $("#tube").val();
      //Get date from input
      var today = $("#today").val();
      database.ref('inventory/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().case)) {
          caseunitadd = "0";
        } else {
          caseunitadd = snapshot.val().case;
        }
        if (isNaN(snapshot.val().tube)) {
          tubeadd = "0";
        } else {
          tubeadd = snapshot.val().tube;
        }
        //Convert input to int
        caseunitadd = parseInt(caseunitadd);
        tubeadd = parseInt(tubeadd);
        //Add inputs value db value
        caseunitadd = caseunitadd + parseInt(caseunit);
        tubeadd = tubeadd + parseInt(tube);
        add_itemToInv_CaseTube_data(itemcodeadd, caseunitadd, tubeadd, today);
      });
      break;
    case "Case-Cone":
      //add_itemToInv_CaseCone_data($("#itemcode").val(), $("#case").val(),$("#cone").val());
      //Get item code
      itemcodeadd = $("#itemcode").val();
      //get units from input boxes
      var caseunit = $("#case").val();
      var cone = $("#cone").val();
      //Get date from input
      var today = $("#today").val();
      database.ref('inventory/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().case)) {
          caseunitadd = "0";
        } else {
          caseunitadd = snapshot.val().case;
        }
        if (isNaN(snapshot.val().cone)) {
          coneadd = "0";
        } else {
          coneadd = snapshot.val().cone;
        }
        //Convert input to int
        caseunitadd = parseInt(caseunitadd);
        coneadd = parseInt(coneadd);
        //Add inputs value db value
        caseunitadd = caseunitadd + parseInt(caseunit);
        coneadd = coneadd + parseInt(cone);
        add_itemToInv_CaseCone_data(itemcodeadd, caseunitadd, coneadd, today);
      });
      break;
    case "Bag-Packets":
      //add_itemToInv_BagPackets_data($("#itemcode").val(), $("#bag").val(),$("#packets").val());
      //Get item code
      itemcodeadd = $("#itemcode").val();
      //get units from input boxes
      var bag = $("#bag").val();
      var packets = $("#packets").val();
      //Get date from input
      var today = $("#today").val();
      database.ref('inventory/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().bag)) {
          bagadd = "0";
        } else {
          bagadd = snapshot.val().bag;
        }
        if (isNaN(snapshot.val().packets)) {
          packetsadd = "0";
        } else {
          packetsadd = snapshot.val().packets;
        }
        //Convert input to int
        bagadd = parseInt(bagadd);
        packetsadd = parseInt(packetsadd);
        //Add inputs value db value
        bagadd = bagadd + parseInt(bag);
        packetsadd = packetsadd + parseInt(packets);
        add_itemToInv_BagPackets_data(itemcodeadd, bagadd, packetsadd, today);
      });
      break;
    case "Bag-Pieces":
      //add_itemToInv_BagPieces_data($("#itemcode").val(), $("#bag").val(),$("#piece").val());
      //Get item code
      itemcodeadd = $("#itemcode").val();
      //get units from input boxes
      var bag = $("#bag").val();
      var piece = $("#piece").val();
      //Get date from input
      var today = $("#today").val();
      database.ref('inventory/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().bag)) {
          bagadd = "0";
        } else {
          bagadd = snapshot.val().bag;
        }
        if (isNaN(snapshot.val().piece)) {
          pieceadd = "0";
        } else {
          pieceadd = snapshot.val().piece;
        }
        //Convert input to int
        bagadd = parseInt(bagadd);
        pieceadd = parseInt(pieceadd);
        //Add inputs value db value
        bagadd = bagadd + parseInt(bag);
        pieceadd = pieceadd + parseInt(piece);
        add_itemToInv_BagPieces_data(itemcodeadd, bagadd, pieceadd, today);
      });

      break;
    default:
      console.log("No package found");
  }

});
function add_itemToInv_CaseBoxPiece_data(itemcode, caseunit, box, piece, today) {
  database.ref('inventory/' + itemcode).update({itemcode: itemcode, case: caseunit, box: box, piece: piece, last_added: today});
}
function add_itemToInv_CasePiece_data(itemcode, caseunit, piece, today) {
  database.ref('inventory/' + itemcode).update({itemcode: itemcode, case: caseunit, piece: piece, last_added: today});
}
function add_itemToInv_CasePackets_data(itemcode, caseunit, packets, today) {
  database.ref('inventory/' + itemcode).update({itemcode: itemcode, case: caseunit, packets: packets, last_added: today});
}
function add_itemToInv_CaseTin_data(itemcode, caseunit, tin, today) {
  database.ref('inventory/' + itemcode).update({itemcode: itemcode, case: caseunit, tin: tin, last_added: today});
}
function add_itemToInv_BundleKattaBox_data(itemcode, bundle, katta, box, today) {
  database.ref('inventory/' + itemcode).update({itemcode: itemcode, bundle: bundle, katta: katta, box: box, last_added: today});
}
function add_itemToInv_BundleBox_data(itemcode, bundle, box, today) {
  database.ref('inventory/' + itemcode).update({itemcode: itemcode, bundle: bundle, box: box, last_added: today});
}
function add_itemToInv_BagKgs_data(itemcode, bundle, kgs, today) {
  database.ref('inventory/' + itemcode).update({itemcode: itemcode, bag: bag, kgs: kgs, last_added: today});
}
function add_itemToInv_CaseCentKatta_data(itemcode, caseunit, cent, katta, today) {
  database.ref('inventory/' + itemcode).update({itemcode: itemcode, case: caseunit, cent: cent, katta: katta, last_added: today});
}
function add_itemToInv_CaseTube_data(itemcode, caseunit, tube, today) {
  database.ref('inventory/' + itemcode).update({itemcode: itemcode, case: caseunit, tube: tube, last_added: today});
}
function add_itemToInv_CaseCone_data(itemcode, caseunit, cone, today) {
  database.ref('inventory/' + itemcode).update({itemcode: itemcode, case: caseunit, cone: cone, last_added: today});
}
function add_itemToInv_BagPackets_data(itemcode, bag, packets, today) {
  database.ref('inventory/' + itemcode).update({itemcode: itemcode, bag: bag, packets: packets, last_added: today});
}
function add_itemToInv_BagPieces_data(itemcode, bag, piece, today) {
  database.ref('inventory/' + itemcode).update({itemcode: itemcode, bag: bag, piece: piece, last_added: today});
}
//Table adding starts here
database.ref('inventory').on('child_added', function(data) {

  //add_categories_data_table(data.val().name, data.val().type);
  switch (data.val().unit) {
    case "Case-Box-Piece":
      if (data.val().box != undefined) {
        add_item_product_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Box : " + data.val().box + " Piece : " + data.val().piece, data.val().last_added);
      }
      break;
    case "Case-Piece":
      if (data.val().piece != undefined) {
        add_item_product_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Piece : " + data.val().piece, data.val().last_added);
      }
      break;
    case "Case-Packets":
      if (data.val().packets != undefined) {
        add_item_product_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Packets : " + data.val().packets, data.val().last_added);
      }
      break;
    case "Case-Tin":
      if (data.val().tin != undefined) {
        add_item_product_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Tin : " + data.val().tin, data.val().last_added);
      }
      break;
    case "Bundle-Katta-Boxes":
      if (data.val().box != undefined) {
        add_item_product_data_table(data.val().itemcode, data.val().name, "Bundle : " + data.val().bundle + " Katta : " + data.val().katta + " Box : " + data.val().box, data.val().last_added);
      }
      break;
    case "Bundle-Boxes":
      if (data.val().box != undefined) {
        add_item_product_data_table(data.val().itemcode, data.val().name, "Bundle : " + data.val().bundle + " Box : " + data.val().box, data.val().last_added);
      }
      break;
    case "Bag-Kgs":
      if (data.val().bag != undefined) {
        add_item_product_data_table(data.val().itemcode, data.val().name, "Bag : " + data.val().bag + " Kgs : " + data.val().kgs, data.val().last_added);
      }
      break;
    case "Case-Cent-Katta":
      if (data.val().cent != undefined) {
        add_item_product_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Cent : " + data.val().cent + " Katta : " + data.val().katta, data.val().last_added);
      }
      break;
    case "Case-Tube":
      if (data.val().tube != undefined) {
        add_item_product_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Tube : " + data.val().tube, data.val().last_added);
      }
      break;
    case "Case-Cone":
      if (data.val().cone != undefined) {
        add_item_product_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Cone : " + data.val().cone, data.val().last_added);
      }
      break;
    case "Bag-Packets":
      if (data.val().bag != undefined) {
        add_item_product_data_table(data.val().itemcode, data.val().name, "Bag : " + data.val().bag + " Packets : " + data.val().packets, data.val().last_added);
      }
      break;
    case "Bag-Pieces":
      if (data.val().bag != undefined) {
        add_item_product_data_table(data.val().itemcode, data.val().name, "Bag : " + data.val().bag + " Piece : " + data.val().piece, data.val().last_added);
      }
      break;
    default:
      console.log("No package found");
  }
});
database.ref('inventory').on('child_changed', function(data) {
  switch (data.val().unit) {
    case "Case-Box-Piece":
      if (data.val().box != undefined) {
        update_item_product_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Box : " + data.val().box + " Piece : " + data.val().piece, data.val().last_added);
      }
      break;
    case "Case-Piece":
      if (data.val().piece != undefined) {
        console.log("in if");
        update_item_product_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Piece : " + data.val().piece, data.val().last_added);
      }
      break;
    case "Case-Packets":
      if (data.val().packets != undefined) {
        update_item_product_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Packets : " + data.val().packets, data.val().last_added);
      }
      break;
    case "Case-Tin":
      if (data.val().tin != undefined) {
        update_item_product_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Tin : " + data.val().tin, data.val().last_added);
      }
      break;
    case "Bundle-Katta-Boxes":
      if (data.val().box != undefined) {
        update_item_product_data_table(data.val().itemcode, data.val().name, "Bundle : " + data.val().bundle + " Katta : " + data.val().katta + " Box : " + data.val().box, data.val().last_added);
      }
      break;
    case "Bundle-Boxes":
      if (data.val().box != undefined) {
        update_item_product_data_table(data.val().itemcode, data.val().name, "Bundle : " + data.val().bundle + " Box : " + data.val().box, data.val().last_added);
      }
      break;
    case "Bag-Kgs":
      if (data.val().bag != undefined) {
        update_item_product_data_table(data.val().itemcode, data.val().name, "Bag : " + data.val().bag + " Kgs : " + data.val().kgs, data.val().last_added);
      }
      break;
    case "Case-Cent-Katta":
      if (data.val().cent != undefined) {
        update_item_product_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Cent : " + data.val().cent + " Katta : " + data.val().katta, data.val().last_added);
      }
      break;
    case "Case-Tube":
      if (data.val().tube != undefined) {
        update_item_product_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Tube : " + data.val().tube, data.val().last_added);
        break;
      }
    case "Case-Cone":
      if (data.val().cone != undefined) {
        update_item_product_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Cone : " + data.val().cone, data.val().last_added);
      }
      break;
    case "Bag-Packets":
      if (data.val().bag != undefined) {
        update_item_product_data_table(data.val().itemcode, data.val().name, "Bag : " + data.val().bag + " Packets : " + data.val().packets, data.val().last_added);
      }
      break;
    case "Bag-Pieces":
      if (data.val().bag != undefined) {
        update_item_product_data_table(data.val().itemcode, data.val().name, "Bag : " + data.val().bag + " Piece : " + data.val().piece, data.val().last_added);
      }
      break;
    default:
      console.log("No package found");
  }
});

//functions for adding to table here
function add_item_product_data_table(itemcode, name, qty, last_added) {
  $("#AddItemsInvTable").prepend('<tr id="' + itemcode + '"><th>' + itemcode + '</th><th>' + name + '</th><th>' + qty + '</th><th>' + last_added + '</th></tr>');
}
function update_item_product_data_table(itemcode, name, qty, last_added) {
  var existence = document.getElementById(itemcode);
  if (existence) {
    $("#AddItemsInvTable #" + itemcode).html('<th>' + itemcode + '</th><th>' + name + '</th><th>' + qty + '</th><th>' + last_added + '</th>');
  } else {
    $("#AddItemsInvTable").prepend('<tr id="' + itemcode + '"><th>' + itemcode + '</th><th>' + name + '</th><th>' + qty + '</th><th>' + last_added + '</th></tr>');
  }

}
/**Add items to Inventory ends here**/
/* Estimate billing starts here* */
function returnCustDetails() {
  var custnumber = $("#customerMobileNumber").val();
  console.log(custnumber + " custnumber");
  database.ref('customers/' + custnumber).once("value").then(function(data) {
    $('#customerName').html(data.val().customername);
    $('#customerEmailID').html(data.val().email);
    $('#customerPhoneNumber').html(data.val().phonenumber);
    $('#customerAddress').html(data.val().address);
  });
}

/** estimate billing ends here*/
/** Print area**/
function printDiv(divName) {
  var printContents = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><link rel=\"stylesheet\" href=\"style.css\" type=\"text/css\" media=\"print\"/>' + document.getElementById(divName).innerHTML;
  var originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
}
/** print area ends**/
/* Purchase order logic starts here */
$("#btnAddPurchaseOrder").click(function() {
  switch (currentunitconfig) {
    case "Case-Box-Piece":
      //add_itemToInv_CaseBoxPiece_data($("#itemcode").val(), $("#case").val(), $("#box").val(), $("#piece").val());
      itemcodeadd = $("#itemcode").val();
      var caseunit = $("#case").val();
      var box = $("#box").val();
      var piece = $("#piece").val();
      var today = $("#today").val();
      database.ref('purchaseorder/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().case)) {
          caseunitadd = "0";
        } else {
          caseunitadd = snapshot.val().case;
        }

        if (isNaN(snapshot.val().box)) {
          boxadd = "0";
        } else {

          boxadd = snapshot.val().box;
        }
        if (isNaN(snapshot.val().piece)) {
          pieceadd = "0";
        } else {

          pieceadd = snapshot.val().piece;
        }
        if (isNaN(snapshot.val().totalorderedcase)) {
          totalorderedcaseunitadd = "0";
        } else {
          totalorderedcaseunitadd = snapshot.val().totalorderedcase;
        }

        if (isNaN(snapshot.val().totalorderedbox)) {
          totalorderedboxadd = "0";
        } else {

          totalorderedboxadd = snapshot.val().totalorderedbox;
        }
        if (isNaN(snapshot.val().totalorderedpiece)) {
          totalorderedpieceadd = "0";
        } else {

          totalorderedpieceadd = snapshot.val().totalorderedpiece;
        }

        caseunitadd = parseInt(caseunitadd);
        boxadd = parseInt(boxadd);
        pieceadd = parseInt(pieceadd);
        totalorderedcaseunitadd = parseInt(totalorderedcaseunitadd);
        totalorderedboxadd = parseInt(totalorderedboxadd);
        totalorderedpieceadd = parseInt(totalorderedpieceadd);
        if ($("#deliverySatus").val() == "Delivered") {
          caseunitadd = caseunitadd - parseInt(caseunit);
          pieceadd = pieceadd - parseInt(piece);
          boxadd = boxadd - parseInt(box);
        } else if ($("#deliverySatus").val() == "To-be-Delivered") {
          caseunitadd = caseunitadd + parseInt(caseunit);
          pieceadd = pieceadd + parseInt(piece);
          boxadd = boxadd + parseInt(box);
          totalorderedcaseunitadd = totalorderedcaseunitadd + parseInt(caseunit);
          totalorderedpieceadd = totalorderedpieceadd + parseInt(piece);
          totalorderedboxadd = totalorderedboxadd + parseInt(box);
        }
        add_itemToPurchaseOrder_CaseBoxPiece_data(itemcodeadd, caseunitadd, boxadd, pieceadd, totalorderedcaseunitadd, totalorderedboxadd, totalorderedpieceadd, today);
      });
      break;
    case "Case-Piece":
      itemcodeadd = $("#itemcode").val();
      var caseunit = $("#case").val();
      var piece = $("#piece").val();
      var today = $("#today").val();
      database.ref('purchaseorder/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().case)) {
          caseunitadd = "0";
        } else {
          caseunitadd = snapshot.val().case;
        }
        if (isNaN(snapshot.val().piece)) {
          pieceadd = "0";
        } else {
          pieceadd = snapshot.val().piece;
        }
        //to
        if (isNaN(snapshot.val().totalorderedcase)) {
          totalorderedcaseunitadd = "0";
        } else {
          totalorderedcaseunitadd = snapshot.val().totalorderedcase;
        }
        if (isNaN(snapshot.val().totalorderedpiece)) {
          totalorderedpieceadd = "0";
        } else {
          totalorderedpieceadd = snapshot.val().totalorderedpiece;
        }
        caseunitadd = parseInt(caseunitadd);
        pieceadd = parseInt(pieceadd);
        totalorderedcaseunitadd = parseInt(caseunitadd);
        totalorderedpieceadd = parseInt(pieceadd);
        if ($("#deliverySatus").val() == "Delivered") {
          caseunitadd = caseunitadd - parseInt(caseunit);
          pieceadd = pieceadd - parseInt(piece);
        } else if ($("#deliverySatus").val() == "To-be-Delivered") {
          caseunitadd = caseunitadd + parseInt(caseunit);
          pieceadd = pieceadd + parseInt(piece);
          totalorderedcaseunitadd = totalorderedcaseunitadd + parseInt(caseunit);
          totalorderedpieceadd = totalorderedpieceadd + parseInt(piece);
        }
        add_itemToPurchaseOrder_CasePiece_data(itemcodeadd, caseunitadd, pieceadd, totalorderedcaseunitadd, totalorderedpieceadd, today);
      });

      break;
    case "Case-Packets":
      //add_itemToInv_CasePackets_data($("#itemcode").val(), $("#case").val(),$("#packets").val());
      itemcodeadd = $("#itemcode").val();
      var caseunit = $("#case").val();
      var packets = $("#packets").val();
      var today = $("#today").val();
      database.ref('purchaseorder/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().case)) {
          caseunitadd = "0";
        } else {
          caseunitadd = snapshot.val().case;
        }
        if (isNaN(snapshot.val().packets)) {
          packetsadd = "0";
        } else {
          packetsadd = snapshot.val().packets;
        }
        if (isNaN(snapshot.val().totalorderedcase)) {
          totalorderedcaseunitadd = "0";
        } else {
          totalorderedcaseunitadd = snapshot.val().totalorderedcase;
        }
        if (isNaN(snapshot.val().totalorderedpackets)) {
          totalorderedpacketsadd = "0";
        } else {
          totalorderedpacketsadd = snapshot.val().totalorderedpackets;
        }
        caseunitadd = parseInt(caseunitadd);
        packetsadd = parseInt(packetsadd);
        totalorderedcaseunitadd = parseInt(totalorderedcaseunitadd);
        totalorderedpacketsadd = parseInt(totalorderedpacketsadd);
        if ($("#deliverySatus").val() == "Delivered") {
          caseunitadd = caseunitadd - parseInt(caseunit);
          packetsadd = packetsadd - parseInt(packets);
        } else if ($("#deliverySatus").val() == "To-be-Delivered") {
          caseunitadd = caseunitadd + parseInt(caseunit);
          packetsadd = packetsadd + parseInt(packets);
          totalorderedcaseunitadd = totalorderedcaseunitadd + parseInt(caseunit);
          totalorderedpacketsadd = totalorderedpacketsadd + parseInt(packets);
        }

        add_itemToPurchaseOrder_CasePackets_data(itemcodeadd, caseunitadd, packetsadd, totalorderedcaseunitadd, totalorderedpacketsadd, today);
      });
      break;
    case "Case-Tin":
      //add_itemToInv_CaseTin_data($("#itemcode").val(), $("#case").val(),$("#tin").val());
      //Get item code
      itemcodeadd = $("#itemcode").val();
      //get units from input boxes
      var caseunit = $("#case").val();
      var tin = $("#tin").val();
      //Get date from input
      var today = $("#today").val();
      database.ref('purchaseorder/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().case)) {
          caseunitadd = "0";
        } else {
          caseunitadd = snapshot.val().case;
        }
        if (isNaN(snapshot.val().tin)) {
          tinadd = "0";
        } else {
          tinadd = snapshot.val().tin;
        }
        if (isNaN(snapshot.val().totalorderedcase)) {
          totalorderedcaseunitadd = "0";
        } else {
          totalorderedcaseunitadd = snapshot.val().totalorderedcase;
        }
        if (isNaN(snapshot.val().totalorderedtin)) {
          totalorderedtinadd = "0";
        } else {
          totalorderedtinadd = snapshot.val().totalorderedtin;
        }
        //Convert input to int
        caseunitadd = parseInt(caseunitadd);
        tinadd = parseInt(tinadd);
        totalorderedcaseunitadd = parseInt(totalorderedcaseunitadd);
        totalorderedtinadd = parseInt(totalorderedtinadd);
        //Add inputs value db value
        if ($("#deliverySatus").val() == "Delivered") {
          caseunitadd = caseunitadd - parseInt(caseunit);
          tinadd = tinadd - parseInt(tin);
        } else if ($("#deliverySatus").val() == "To-be-Delivered") {
          caseunitadd = caseunitadd + parseInt(caseunit);
          tinadd = tinadd + parseInt(tin);
          totalorderedcaseunitadd = totalorderedcaseunitadd + parseInt(caseunit);
          totalorderedtinadd = totalorderedtinadd + parseInt(tin);
        }

        add_itemToPurchaseOrder_CaseTin_data(itemcodeadd, caseunitadd, tinadd, totalorderedcaseunitadd, totalorderedtinadd, today);
      });
      break;
    case "Bundle-Katta-Boxes":
      //add_itemToInv_BundleKattaBox_data($("#itemcode").val(), $("#bundle").val(), $("#katta").val(), $("#box").val());
      itemcodeadd = $("#itemcode").val();
      var bundle = $("#bundle").val();
      var box = $("#box").val();
      var katta = $("#katta").val();
      var today = $("#today").val();
      database.ref('purchaseorder/' + itemcodeadd).once("value").then(function(snapshot) {

        if (isNaN(snapshot.val().bundle)) {
          bundleadd = "0";
        } else {
          bundleadd = snapshot.val().bundle;
        }

        if (isNaN(snapshot.val().box)) {
          boxadd = "0";
        } else {

          boxadd = snapshot.val().box;
        }
        if (isNaN(snapshot.val().katta)) {
          kattaadd = "0";
        } else {
          kattaadd = snapshot.val().katta;
        } //to
        if (isNaN(snapshot.val().totalorderedbundle)) {
          totalorderedbundleadd = "0";
        } else {
          totalorderedbundleadd = snapshot.val().totalorderedbundle;
        }

        if (isNaN(snapshot.val().totalorderedbox)) {
          totalorderedboxadd = "0";
        } else {

          totalorderedboxadd = snapshot.val().totalorderedbox;
        }
        if (isNaN(snapshot.val().totalorderedkatta)) {
          totalorderedkattaadd = "0";
        } else {
          totalorderedkattaadd = snapshot.val().totalorderedkatta;
        }

        bundleadd = parseInt(bundleadd);
        boxadd = parseInt(boxadd);
        kattaadd = parseInt(kattaadd);
        totalorderedbundleadd = parseInt(totalorderedbundleadd);
        totalorderedboxadd = parseInt(totalorderedboxadd);
        totalorderedkattaadd = parseInt(totalorderedkattaadd);
        //

        //
        if ($("#deliverySatus").val() == "Delivered") {
          bundleadd = bundleadd - parseInt(bundle);
          kattaadd = kattaadd - parseInt(katta);
          boxadd = boxadd - parseInt(box);
        } else if ($("#deliverySatus").val() == "To-be-Delivered") {
          bundleadd = bundleadd + parseInt(bundle);
          kattaadd = kattaadd + parseInt(katta);
          boxadd = boxadd + parseInt(box);
          totalorderedbundleadd = totalorderedbundleadd + parseInt(bundle);
          totalorderedkattaadd = totalorderedkattaadd + parseInt(katta);
          totalorderedboxadd = totalorderedboxadd + parseInt(box);
        }
        add_itemToPurchaseOrder_BundleKattaBox_data(itemcodeadd, bundleadd, kattaadd, boxadd, totalorderedbundleadd, totalorderedkattaadd, totalorderedboxadd, today);
      });
      break;
    case "Bundle-Boxes":
      //add_itemToInv_BundleBox_data($("#itemcode").val(), $("#bundle").val(),$("#box").val());
      itemcodeadd = $("#itemcode").val();
      var bundle = $("#bundle").val();
      var box = $("#box").val();
      var today = $("#today").val();
      database.ref('purchaseorder/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().bundle)) {
          bundleadd = "0";
        } else {
          bundleadd = snapshot.val().bundle;
        }
        if (isNaN(snapshot.val().box)) {
          boxadd = "0";
        } else {
          boxadd = snapshot.val().box;
        }
        if (isNaN(snapshot.val().totalorderedbundle)) {
          totalorderedbundleadd = "0";
        } else {
          totalorderedbundleadd = snapshot.val().totalorderedbundle;
        }
        if (isNaN(snapshot.val().totalorderedbox)) {
          totalorderedboxadd = "0";
        } else {
          totalorderedboxadd = snapshot.val().totalorderedbox;
        }
        bundleadd = parseInt(bundleadd);
        boxadd = parseInt(boxadd);
        totalorderedbundleadd = parseInt(totalorderedbundleadd);
        totalorderedboxadd = parseInt(totalorderedboxadd);
        //

        //
        if ($("#deliverySatus").val() == "Delivered") {
          bundleadd = bundleadd - parseInt(bundle);
          boxadd = boxadd - parseInt(box);
        } else if ($("#deliverySatus").val() == "To-be-Delivered") {
          bundleadd = bundleadd + parseInt(bundle);
          boxadd = boxadd + parseInt(box);
          totalorderedbundleadd = totalorderedbundleadd + parseInt(bundle);
          totalorderedboxadd = totalorderedboxadd + parseInt(box);
        }
        add_itemToPurchaseOrder_BundleBox_data(itemcodeadd, bundleadd, boxadd, totalorderedbundleadd, totalorderedboxadd, today);
      });
      break;
    case "Bag-Kgs":
      //add_itemToInv_BagKgs_data($("#itemcode").val(), $("#bag").val(),$("#kgs").val());
      //Get item code
      itemcodeadd = $("#itemcode").val();
      //get units from input boxes
      var bag = $("#bag").val();
      var kgs = $("#kgs").val();
      //Get date from input
      var today = $("#today").val();
      database.ref('purchaseorder/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().bag)) {
          bagadd = "0";
        } else {
          bagadd = snapshot.val().bag;
        }
        if (isNaN(snapshot.val().kgs)) {
          kgsadd = "0";
        } else {
          kgsadd = snapshot.val().kgs;
        }
        if (isNaN(snapshot.val().totalorderedbag)) {
          totalorderedbagadd = "0";
        } else {
          totalorderedbagadd = snapshot.val().totalorderedbag;
        }
        if (isNaN(snapshot.val().totalorderedkgs)) {
          totalorderedkgsadd = "0";
        } else {
          totalorderedkgsadd = snapshot.val().totalorderedkgs;
        }
        //Convert input to int
        bagadd = parseInt(bagadd);
        kgsadd = parseInt(kgsadd);
        totalorderedbagadd = parseInt(totalorderedbagadd);
        totalorderedkgsadd = parseInt(totalorderedkgsadd);
        //Add inputs value db value

        if ($("#deliverySatus").val() == "Delivered") {
          bagadd = bagadd - parseInt(bag);
          kgsadd = kgsadd - parseInt(kgs);
        } else if ($("#deliverySatus").val() == "To-be-Delivered") {
          bagadd = bagadd + parseInt(bag);
          kgsadd = kgsadd + parseInt(kgs);
          totalorderedbagadd = totalorderedbagadd + parseInt(bag);
          totalorderedkgsadd = totalorderedkgsadd + parseInt(kgs);
        }
        add_itemToPurchaseOrder_BagKgs_data(itemcodeadd, bagadd, kgsadd, totalorderedbagadd, totalorderedkgsadd, today);
      });
      break;
    case "Case-Cent-Katta":
      //  add_itemToInv_CaseCentKatta_data($("#itemcode").val(), $("#case").val(), $("#cent").val(), $("#katta").val());
      itemcodeadd = $("#itemcode").val();
      var caseunit = $("#case").val();
      var cent = $("#cent").val();
      var katta = $("#katta").val();
      var today = $("#today").val();
      database.ref('purchaseorder/' + itemcodeadd).once("value").then(function(snapshot) {

        if (isNaN(snapshot.val().case)) {
          caseunitadd = "0";
        } else {
          caseunitadd = snapshot.val().case;
        }
        if (isNaN(snapshot.val().cent)) {
          centadd = "0";
        } else {

          centadd = snapshot.val().cent;
        }
        if (isNaN(snapshot.val().katta)) {
          kattaadd = "0";
        } else {
          kattaadd = snapshot.val().katta;
        }
        //
        if (isNaN(snapshot.val().totalorderedcase)) {
          totalorderedcaseunitadd = "0";
        } else {
          totalorderedcaseunitadd = snapshot.val().totalorderedcase;
        }
        if (isNaN(snapshot.val().totalorderedcent)) {
          totalorderedcentadd = "0";
        } else {

          totalorderedcentadd = snapshot.val().totalorderedcent;
        }
        if (isNaN(snapshot.val().totalorderedkatta)) {
          totalorderedkattaadd = "0";
        } else {
          totalorderedkattaadd = snapshot.val().totalorderedkatta;
        }

        caseunitadd = parseInt(caseunitadd);
        centadd = parseInt(centadd);
        kattaadd = parseInt(kattaadd);
        totalorderedcaseunitadd = parseInt(totalorderedcaseunitadd);
        totalorderedcentadd = parseInt(totalorderedcentadd);
        totalorderedkattaadd = parseInt(totalorderedkattaadd);
        //

        if ($("#deliverySatus").val() == "Delivered") {
          caseunitadd = caseunitadd - parseInt(caseunit);
          centadd = centadd - parseInt(cent);
          kattaadd = kattaadd - parseInt(katta);
        } else if ($("#deliverySatus").val() == "To-be-Delivered") {
          caseunitadd = caseunitadd + parseInt(caseunit);
          centadd = centadd + parseInt(cent);
          kattaadd = kattaadd + parseInt(katta);
          totalorderedcaseunitadd = totalorderedcaseunitadd + parseInt(caseunit);
          totalorderedcentadd = totalorderedcentadd + parseInt(cent);
          totalorderedkattaadd = totalorderedkattaadd + parseInt(katta);
        }
        add_itemToPurchaseOrder_CaseCentKatta_data(itemcodeadd, caseunitadd, centadd, kattaadd, totalorderedcaseunitadd, totalorderedcentadd, totalorderedkattaadd, today);
      });
      break;
      //Verified upto here
    case "Case-Tube":
      //add_itemToInv_CaseTube_data($("#itemcode").val(), $("#case").val(),$("#tube").val());
      //Get item code
      itemcodeadd = $("#itemcode").val();
      //get units from input boxes
      var caseunit = $("#case").val();
      var tube = $("#tube").val();
      //Get date from input
      var today = $("#today").val();
      database.ref('purchaseorder/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().case)) {
          caseunitadd = "0";
        } else {
          caseunitadd = snapshot.val().case;
        }
        if (isNaN(snapshot.val().tube)) {
          tubeadd = "0";
        } else {
          tubeadd = snapshot.val().tube;
        }
        //
        if (isNaN(snapshot.val().totalorderedcase)) {
          totalorderedcaseunitadd = "0";
        } else {
          totalorderedcaseunitadd = snapshot.val().totalorderedcase;
        }
        if (isNaN(snapshot.val().totalorderedtube)) {
          totalorderedtubeadd = "0";
        } else {
          totalorderedtubeadd = snapshot.val().totalorderedtube;
        }
        //Convert input to int
        caseunitadd = parseInt(caseunitadd);
        tubeadd = parseInt(tubeadd);
        totalorderedcaseunitadd = parseInt(totalorderedcaseunitadd);
        totalorderedtubeadd = parseInt(totalorderedtubeadd);
        //Add inputs value db value

        if ($("#deliverySatus").val() == "Delivered") {
          caseunitadd = caseunitadd - parseInt(caseunit);
          tubeadd = tubeadd - parseInt(tube);
        } else if ($("#deliverySatus").val() == "To-be-Delivered") {
          caseunitadd = caseunitadd + parseInt(caseunit);
          tubeadd = tubeadd + parseInt(tube);
          totalorderedcaseunitadd = totalorderedcaseunitadd + parseInt(caseunit);
          totalorderedtubeadd = totalorderedtubeadd + parseInt(tube);
        }
        add_itemToPurchaseOrder_CaseTube_data(itemcodeadd, caseunitadd, tubeadd, totalorderedcaseunitadd, totalorderedtubeadd, today);
      });
      break;
    case "Case-Cone":
      //add_itemToInv_CaseCone_data($("#itemcode").val(), $("#case").val(),$("#cone").val());
      //Get item code
      itemcodeadd = $("#itemcode").val();
      //get units from input boxes
      var caseunit = $("#case").val();
      var cone = $("#cone").val();
      //Get date from input
      var today = $("#today").val();
      database.ref('purchaseorder/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().case)) {
          caseunitadd = "0";
        } else {
          caseunitadd = snapshot.val().case;
        }
        if (isNaN(snapshot.val().cone)) {
          coneadd = "0";
        } else {
          coneadd = snapshot.val().cone;
        }
        //
        if (isNaN(snapshot.val().totalorderedcase)) {
          totalorderedcaseunitadd = "0";
        } else {
          totalorderedcaseunitadd = snapshot.val().totalorderedcase;
        }
        if (isNaN(snapshot.val().totalorderedcone)) {
          totalorderedconeadd = "0";
        } else {
          totalorderedconeadd = snapshot.val().totalorderedcone;
        }
        //Convert input to int
        caseunitadd = parseInt(caseunitadd);
        coneadd = parseInt(coneadd);
        totalorderedcaseunitadd = parseInt(totalorderedcaseunitadd);
        totalorderedconeadd = parseInt(totalorderedconeadd);
        if ($("#deliverySatus").val() == "Delivered") {
          caseunitadd = caseunitadd - parseInt(caseunit);
          coneadd = coneadd - parseInt(cone);
        } else if ($("#deliverySatus").val() == "To-be-Delivered") {
          caseunitadd = caseunitadd + parseInt(caseunit);
          coneadd = coneadd + parseInt(cone);
          totalorderedcaseunitadd = totalorderedcaseunitadd + parseInt(caseunit);
          totalorderedconeadd = totalorderedconeadd + parseInt(cone);
        }
        //Add inputs value db value

        add_itemToPurchaseOrder_CaseCone_data(itemcodeadd, caseunitadd, coneadd, totalorderedcaseunitadd, totalorderedconeadd, today);
      });
      break;
    case "Bag-Packets":
      //add_itemToInv_BagPackets_data($("#itemcode").val(), $("#bag").val(),$("#packets").val());
      //Get item code
      itemcodeadd = $("#itemcode").val();
      //get units from input boxes
      var bag = $("#bag").val();
      var packets = $("#packets").val();
      //Get date from input
      var today = $("#today").val();
      database.ref('purchaseorder/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().bag)) {
          bagadd = "0";
        } else {
          bagadd = snapshot.val().bag;
        }
        if (isNaN(snapshot.val().packets)) {
          packetsadd = "0";
        } else {
          packetsadd = snapshot.val().packets;
        }
        if (isNaN(snapshot.val().totalorderedbag)) {
          totalorderedbagadd = "0";
        } else {
          totalorderedbagadd = snapshot.val().totalorderedbag;
        }
        if (isNaN(snapshot.val().totalorderedpackets)) {
          totalorderedpacketsadd = "0";
        } else {
          totalorderedpacketsadd = snapshot.val().totalorderedpackets;
        }
        //Convert input to int
        bagadd = parseInt(bagadd);
        packetsadd = parseInt(packetsadd);
        totalorderedbagadd = parseInt(totalorderedbagadd);
        totalorderedpacketsadd = parseInt(totalorderedpacketsadd);
        //Add inputs value db value

        if ($("#deliverySatus").val() == "Delivered") {
          bagadd = bagadd - parseInt(bag);
          packetsadd = packetsadd - parseInt(packets);
        } else if ($("#deliverySatus").val() == "To-be-Delivered") {
          bagadd = bagadd + parseInt(bag);
          packetsadd = packetsadd + parseInt(packets);
          totalorderedbagadd = totalorderedbagadd + parseInt(bag);
          totalorderedpacketsadd = totalorderedpacketsadd + parseInt(packets);
        }
        add_itemToPurchaseOrder_BagPackets_data(itemcodeadd, bagadd, packetsadd, totalorderedbagadd, totalorderedpacketsadd, today);
      });
      break;
    case "Bag-Pieces":
      //add_itemToInv_BagPieces_data($("#itemcode").val(), $("#bag").val(),$("#piece").val());
      //Get item code
      itemcodeadd = $("#itemcode").val();
      //get units from input boxes
      var bag = $("#bag").val();
      var piece = $("#piece").val();
      //Get date from input
      var today = $("#today").val();
      database.ref('purchaseorder/' + itemcodeadd).once("value").then(function(snapshot) {
        if (isNaN(snapshot.val().bag)) {
          bagadd = "0";
        } else {
          bagadd = snapshot.val().bag;
        }
        if (isNaN(snapshot.val().piece)) {
          pieceadd = "0";
        } else {
          pieceadd = snapshot.val().piece;
        }
        //
        if (isNaN(snapshot.val().totalorderedbag)) {
          totalorderedbagadd = "0";
        } else {
          totalorderedbagadd = snapshot.val().totalorderedbag;
        }
        if (isNaN(snapshot.val().totalorderedpiece)) {
          totalorderedpieceadd = "0";
        } else {
          totalorderedpieceadd = snapshot.val().totalorderedpiece;
        }
        //Convert input to int
        bagadd = parseInt(bagadd);
        pieceadd = parseInt(pieceadd);
        totalorderedbagadd = parseInt(totalorderedbagadd);
        totalorderedpieceadd = parseInt(totalorderedpieceadd);
        //Add inputs value db value

        if ($("#deliverySatus").val() == "Delivered") {
          bagadd = bagadd - parseInt(bag);
          pieceadd = pieceadd - parseInt(piece);
        } else if ($("#deliverySatus").val() == "To-be-Delivered") {
          bagadd = bagadd + parseInt(bag);
          pieceadd = pieceadd + parseInt(piece);
          totalorderedbagadd = totalorderedbagadd + parseInt(bag);
          totalorderedpieceadd = totalorderedpieceadd + parseInt(piece);
        }
        add_itemToPurchaseOrder_BagPieces_data(itemcodeadd, bagadd, pieceadd, totalorderedbagadd, totalorderedpieceadd, today);
      });

      break;
    default:
      console.log("No package found");
  }

});
function add_itemToPurchaseOrder_CaseBoxPiece_data(itemcode, caseunit, box, piece, totalcaseunit, totalbox, totalpiece, today) {
  database.ref('purchaseorder/' + itemcode).update({
    itemcode: itemcode,
    case: caseunit,
    box: box,
    piece: piece,
    last_added: today,
    totalorderedcase: totalcaseunit,
    totalorderedbox: totalbox,
    totalorderedpiece: totalpiece
  });
}
function add_itemToPurchaseOrder_CasePiece_data(itemcode, caseunit, piece, totalcaseunit, totalpiece, today) {
  database.ref('purchaseorder/' + itemcode).update({
    itemcode: itemcode,
    case: caseunit,
    piece: piece,
    last_added: today,
    totalorderedcase: totalcaseunit,
    totalorderedpiece: totalpiece
  });
}
function add_itemToPurchaseOrder_CasePackets_data(itemcode, caseunit, packets, totalcaseunit, totalpackets, today) {
  database.ref('purchaseorder/' + itemcode).update({
    itemcode: itemcode,
    case: caseunit,
    packets: packets,
    last_added: today,
    totalorderedcase: totalcaseunit,
    totalorderedpackets: totalpackets
  });
}
function add_itemToPurchaseOrder_CaseTin_data(itemcode, caseunit, tin, totalcaseunit, totaltin, today) {
  database.ref('purchaseorder/' + itemcode).update({
    itemcode: itemcode,
    case: caseunit,
    tin: tin,
    last_added: today,
    totalorderedcase: totalcaseunit,
    totalorderedtin: totaltin
  });
}
function add_itemToPurchaseOrder_BundleKattaBox_data(itemcode, bundle, katta, box, totalbundle, totalkatta, totalbox, today) {
  database.ref('purchaseorder/' + itemcode).update({
    itemcode: itemcode,
    bundle: bundle,
    katta: katta,
    box: box,
    last_added: today,
    totalorderedbundle: totalbundle,
    totalorderedkatta: totalkatta,
    totalorderedbox: totalbox
  });
}
function add_itemToPurchaseOrder_BundleBox_data(itemcode, bundle, box, totalbundle, totalbox, today) {
  database.ref('purchaseorder/' + itemcode).update({
    itemcode: itemcode,
    bundle: bundle,
    box: box,
    last_added: today,
    totalorderedbundle: totalbundle,
    totalorderedbox: totalbox
  });
}
function add_itemToPurchaseOrder_BagKgs_data(itemcode, bundle, kgs, totalbundle, totalkgs, today) {
  database.ref('purchaseorder/' + itemcode).update({
    itemcode: itemcode,
    bag: bag,
    kgs: kgs,
    last_added: today,
    totalorderedbag: totalbag,
    totalorderedkgs: totalkgs
  });
}
function add_itemToPurchaseOrder_CaseCentKatta_data(itemcode, caseunit, cent, katta, totalcaseunit, totalcent, totalkatta, today) {
  database.ref('purchaseorder/' + itemcode).update({
    itemcode: itemcode,
    case: caseunit,
    cent: cent,
    katta: katta,
    last_added: today,
    totalorderedcase: totalcaseunit,
    totalorderedcent: totalcent,
    totalorderedkatta: totalkatta
  });
}
function add_itemToPurchaseOrder_CaseTube_data(itemcode, caseunit, tube, totalcaseunit, totaltube, today) {
  database.ref('purchaseorder/' + itemcode).update({
    itemcode: itemcode,
    case: caseunit,
    tube: tube,
    last_added: today,
    totalorderedcase: totalcaseunit,
    totalorderedtube: totaltube
  });
}
function add_itemToPurchaseOrder_CaseCone_data(itemcode, caseunit, cone, totalcaseunit, totalcone, today) {
  database.ref('purchaseorder/' + itemcode).update({
    itemcode: itemcode,
    case: caseunit,
    cone: cone,
    last_added: today,
    totalorderedcase: totalcaseunit,
    totalorderedcone: totalcone
  });
}
function add_itemToPurchaseOrder_BagPackets_data(itemcode, bag, packets, totalbag, totalpackets, today) {
  database.ref('purchaseorder/' + itemcode).update({
    itemcode: itemcode,
    bag: bag,
    packets: packets,
    last_added: today,
    totalorderedbag: totalbag,
    totalorderedpackets: totalpackets
  });
}
function add_itemToPurchaseOrder_BagPieces_data(itemcode, bag, piece, totalbag, totalpiece, today) {
  database.ref('purchaseorder/' + itemcode).update({
    itemcode: itemcode,
    bag: bag,
    piece: piece,
    last_added: today,
    totalorderedbag: totalbag,
    totalorderedpiece: totalpiece
  });
}
database.ref('purchaseorder').on('child_added', function(data) {
  //add_categories_data_table(data.val().name, data.val().type);
  switch (data.val().unit) {
    case "Case-Box-Piece":
      if (data.val().box != undefined) {
        add_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Box : " + data.val().box + " Piece : " + data.val().piece, "Case : " + data.val().totalorderedcase + " Box : " + data.val().totalorderedbox + " Piece : " + data.val().totalorderedpiece, data.val().last_added);
      }
      break;
    case "Case-Piece":
      if (data.val().piece != undefined) {
        add_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Piece : " + data.val().piece, "Case : " + data.val().totalorderedcase + " Piece : " + data.val().totalorderedpiece, data.val().last_added);
      }
      break;
    case "Case-Packets":
      if (data.val().packets != undefined) {
        add_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Packets : " + data.val().packets, "Case : " + data.val().totalorderedcase + " Packets : " + data.val().totalorderedpackets, data.val().last_added);
      }
      break;
    case "Case-Tin":
      if (data.val().tin != undefined) {
        add_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Tin : " + data.val().tin, "Case : " + data.val().totalorderedcase + " Tin : " + data.val().totalorderedtin, data.val().last_added);
      }
      break;
    case "Bundle-Katta-Boxes":
      if (data.val().box != undefined) {
        add_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Bundle : " + data.val().bundle + " Katta : " + data.val().katta + " Box : " + data.val().box, "Bundle : " + data.val().totalorderedbundle + " Katta : " + data.val().totalorderedkatta + " Box : " + data.val().totalorderedbox, data.val().last_added);
      }
      break;
    case "Bundle-Boxes":
      if (data.val().box != undefined) {
        add_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Bundle : " + data.val().bundle + " Box : " + data.val().box, "Bundle : " + data.val().totalorderedbundle + " Box : " + data.val().totalorderedbox, data.val().last_added);
      }
      break;
    case "Bag-Kgs":
      if (data.val().bag != undefined) {
        add_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Bag : " + data.val().bag + " Kgs : " + data.val().kgs, "Bag : " + data.val().totalorderedbag + " Kgs : " + data.val().totalorderedkgs, data.val().last_added);
      }
      break;
    case "Case-Cent-Katta":
      if (data.val().cent != undefined) {
        add_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Cent : " + data.val().cent + " Katta : " + data.val().katta, "Case : " + data.val().totalorderedcase + " Cent : " + data.val().totalorderedcent + " Katta : " + data.val().totalorderedkatta, data.val().last_added);
      }
      break;
    case "Case-Tube":
      if (data.val().tube != undefined) {
        add_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Tube : " + data.val().tube, "Case : " + data.val().totalorderedcase + " Tube : " + data.val().totalorderedtube, data.val().last_added);
      }
      break;
    case "Case-Cone":
      if (data.val().cone != undefined) {
        add_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Cone : " + data.val().cone, "Case : " + data.val().totalorderedcase + " Cone : " + data.val().totalorderedcone, data.val().last_added);
      }
      break;
    case "Bag-Packets":
      if (data.val().bag != undefined) {
        add_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Bag : " + data.val().bag + " Packets : " + data.val().packets, "Bag : " + data.val().totalorderedbag + " Packets : " + data.val().totalorderedpackets, data.val().last_added);
      }
      break;
    case "Bag-Pieces":
      if (data.val().bag != undefined) {
        add_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Bag : " + data.val().bag + " Piece : " + data.val().piece, "Bag : " + data.val().totalorderedbag + " Piece : " + data.val().totalorderedpiece, data.val().last_added);
      }
      break;
    default:
      console.log("No package found");
  }
});
function add_item_purchaseOrder_data_table(itemcode, name, qty, totalqty, last_added) {
  $("#AddItemsPurchaseOrderTable").prepend('<tr id="' + itemcode + '"><th>' + itemcode + '</th><th>' + name + '</th><th>' + qty + '</th><th>' + totalqty + '</th><th>' + last_added + '</th></tr>');
}
database.ref('purchaseorder').on('child_changed', function(data) {
  switch (data.val().unit) {
    case "Case-Box-Piece":
      if (data.val().box != undefined) {
        update_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Box : " + data.val().box + " Piece : " + data.val().piece, "Case : " + data.val().totalorderedcase + " Box : " + data.val().totalorderedbox + " Piece : " + data.val().totalorderedpiece, data.val().last_added);
      }
      break;
    case "Case-Piece":
      if (data.val().piece != undefined) {
        console.log("in if");
        update_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Piece : " + data.val().piece, "Case : " + data.val().totalorderedcase + " Piece : " + data.val().totalorderedpiece, data.val().last_added);
      }
      break;
    case "Case-Packets":
      if (data.val().packets != undefined) {
        update_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Packets : " + data.val().packets, "Case : " + data.val().totalorderedcase + " Packets : " + data.val().totalorderedpackets, data.val().last_added);
      }
      break;
    case "Case-Tin":
      if (data.val().tin != undefined) {
        update_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Tin : " + data.val().tin, "Case : " + data.val().totalorderedcase + " Tin : " + data.val().totalorderedtin, data.val().last_added);
      }
      break;
    case "Bundle-Katta-Boxes":
      if (data.val().box != undefined) {
        update_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Bundle : " + data.val().bundle + " Katta : " + data.val().katta + " Box : " + data.val().box, "Bundle : " + data.val().totalorderedbundle + " Katta : " + data.val().totalorderedkatta + " Box : " + data.val().totalorderedbox, data.val().last_added);
      }
      break;
    case "Bundle-Boxes":
      if (data.val().box != undefined) {
        update_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Bundle : " + data.val().bundle + " Box : " + data.val().box, "Bundle : " + data.val().totalorderedbundle + " Box : " + data.val().totalorderedbox, data.val().last_added);
      }
      break;
    case "Bag-Kgs":
      if (data.val().bag != undefined) {
        update_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Bag : " + data.val().bag + " Kgs : " + data.val().kgs, "Bag : " + data.val().totalorderedbag + " Kgs : " + data.val().totalorderedkgs, data.val().last_added);
      }
      break;
    case "Case-Cent-Katta":
      if (data.val().cent != undefined) {
        update_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Cent : " + data.val().cent + " Katta : " + data.val().katta, "Case : " + data.val().totalorderedcase + " Cent : " + data.val().totalorderedcent + " Katta : " + data.val().totalorderedkatta, data.val().last_added);
      }
      break;
    case "Case-Tube":
      if (data.val().tube != undefined) {
        update_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Tube : " + data.val().tube, "Case : " + data.val().totalorderedcase + " Tube : " + data.val().totalorderedtube, data.val().last_added);
        break;
      }
    case "Case-Cone":
      if (data.val().cone != undefined) {
        update_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Case : " + data.val().case + " Cone : " + data.val().cone, "Case : " + data.val().totalorderedcase + " Cone : " + data.val().totalorderedcone, data.val().last_added);
      }
      break;
    case "Bag-Packets":
      if (data.val().bag != undefined) {
        update_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Bag : " + data.val().bag + " Packets : " + data.val().packets, "Bag : " + data.val().totalorderedbag + " Packets : " + data.val().totalorderedpackets, data.val().last_added);
      }
      break;
    case "Bag-Pieces":
      if (data.val().bag != undefined) {
        update_item_purchaseOrder_data_table(data.val().itemcode, data.val().name, "Bag : " + data.val().bag + " Piece : " + data.val().piece, "Bag : " + data.val().totalorderedbag + " Piece : " + data.val().totalorderedpiece, data.val().last_added);
      }
      break;
    default:
      console.log("No package found");
  }
});
function update_item_purchaseOrder_data_table(itemcode, name, qty, totalqty, last_added) {
  var existence = document.getElementById(itemcode);
  if (existence) {
    $("#AddItemsPurchaseOrderTable #" + itemcode).html('<th>' + itemcode + '</th><th>' + name + '</th><th>' + qty + '</th><th>' + totalqty + '</th><th>' + last_added + '</th>');
  } else {
    $("#AddItemsPurchaseOrderTable").prepend('<tr id="' + itemcode + '"><th>' + itemcode + '</th><th>' + name + '</th><th>' + qty + '</th><th>' + totalqty + '</th><th>' + last_added + '</th></tr>');
  }

}
/* Purchase order logic ends here */
/*View Inventory logic starts here*/
function showCompanyInput(){
  var checkBox = document.getElementById("companyCheckbox");
      var company = document.getElementById("companyDIV");
      if (checkBox.checked == true){
          company.style.display = "block";
      } else {
         company.style.display = "none";
      }
}
function showCategoryInput(){
  var checkBox = document.getElementById("categoryCheckbox");
      var category = document.getElementById("categoryDIV");
      if (checkBox.checked == true){
          category.style.display = "block";
      } else {
         category.style.display = "none";
      }
}
function showSubCategoryInput(){
  var checkBox = document.getElementById("subCategoryCheckbox");
    var subcategory = document.getElementById("subCategoryDIV");
    if (checkBox.checked == true){
        subcategory.style.display = "block";
    } else {
       subcategory.style.display = "none";
    }
}
database.ref('inventory').on('child_added', function(data) {
  itemcodeInv = data.val().itemcode;
  switch (data.val().unit) {
    case "Case-Box-Piece":
    database.ref('purchaseorder/'+itemcodeInv).once("value").then(function(snapshot) {
          totalPOqty = "Case : "+snapshot.val().case+" Box : "+snapshot.val().box+" Piece : "+snapshot.val().piece;
          caseunitadd=parseInt(snapshot.val().case);
          boxadd=parseInt(snapshot.val().box);
          pieceadd=parseInt(snapshot.val().piece);
          totalInvqty = "Case : "+data.val().case+" Box : "+data.val().box+" Piece : "+data.val().piece;
          caseunitadd=caseunitadd+parseInt(data.val().case);
          boxadd=boxadd+parseInt(data.val().box);
          pieceadd=pieceadd+parseInt(data.val().piece);
          totalqtyInvPO ="Case : "+caseunitadd+" Box : "+boxadd+" Piece : "+pieceadd;
          add_invAndPOView_data_table(itemcodeInv,data.val().name,data.val().companyname,data.val().category,data.val().subcategory,totalInvqty,totalPOqty,totalqtyInvPO);
      });
      break;
      case "Case-Piece":
      database.ref('purchaseorder/'+itemcodeInv).once("value").then(function(snapshot) {
            totalPOqty = "Case : "+snapshot.val().case+" Piece : "+snapshot.val().piece;
            totalInvqty = "Case : "+data.val().case+" Piece : "+data.val().piece;
            caseunitadd=parseInt(snapshot.val().case);
            pieceadd=parseInt(snapshot.val().piece);
            caseunitadd=caseunitadd+parseInt(data.val().case);
            pieceadd=pieceadd+parseInt(data.val().piece);
            totalqtyInvPO ="Case : "+caseunitadd+" Piece : "+pieceadd;
            add_invAndPOView_data_table(itemcodeInv,data.val().name,data.val().companyname,data.val().category,data.val().subcategory,totalInvqty,totalPOqty,totalqtyInvPO);
        });
        break;
      case "Case-Packets":
        tdatabase.ref('purchaseorder/'+itemcodeInv).once("value").then(function(snapshot) {
              totalPOqty = "Case : "+snapshot.val().case+" Packets : "+snapshot.val().packets;
              totalInvqty = "Case : "+data.val().case+" Packets : "+data.val().packets;
              caseunitadd=parseInt(snapshot.val().case);
              packetsadd=parseInt(snapshot.val().packets);
              caseunitadd=caseunitadd+parseInt(data.val().case);
              packetsadd=pieceadd+parseInt(data.val().packets);
              totalqtyInvPO ="Case : "+caseunitadd+" Packets : "+packetsadd;
              add_invAndPOView_data_table(itemcodeInv,data.val().name,data.val().companyname,data.val().category,data.val().subcategory,totalInvqty,totalPOqty,totalqtyInvPO);
          });
        break;
      case "Case-Tin":
      database.ref('purchaseorder/'+itemcodeInv).once("value").then(function(snapshot) {
            totalPOqty = "Case : "+snapshot.val().case+" Tin : "+snapshot.val().tin;
            totalInvqty = "Case : "+data.val().case+" Tin : "+data.val().tin;
            caseunitadd=parseInt(snapshot.val().case);
            tinadd=parseInt(snapshot.val().tin);
            caseunitadd=caseunitadd+parseInt(data.val().case);
            tinadd=tinadd+parseInt(data.val().tin);
            totalqtyInvPO ="Case : "+caseunitadd+" Tin : "+tinadd;
            add_invAndPOView_data_table(itemcodeInv,data.val().name,data.val().companyname,data.val().category,data.val().subcategory,totalInvqty,totalPOqty,totalqtyInvPO);
        });
        break;
      case "Bundle-Katta-Boxes":
      database.ref('purchaseorder/'+itemcodeInv).once("value").then(function(snapshot) {
            totalPOqty = "Bundle : "+snapshot.val().bundle+" Katta : "+snapshot.val().katta+" Box : "+snapshot.val().box;
            bundleadd=parseInt(snapshot.val().bundle);
            kattaadd=parseInt(snapshot.val().katta);
            boxadd=parseInt(snapshot.val().boxadd);
            totalInvqty = "Bundle : "+data.val().bundle+" Katta : "+data.val().katta+" Box : "+data.val().box;
            bundleadd=bundleadd+parseInt(data.val().bundle);
            boxadd=boxadd+parseInt(data.val().box);
            kattaadd=kattaadd+parseInt(data.val().katta);
            totalqtyInvPO ="Bundle : "+bundleadd+" Katta : "+kattaadd+" Box : "+boxadd;
            add_invAndPOView_data_table(itemcodeInv,data.val().name,data.val().companyname,data.val().category,data.val().subcategory,totalInvqty,totalPOqty,totalqtyInvPO);
        });
        break;
      case "Bundle-Boxes":
      database.ref('purchaseorder/'+itemcodeInv).once("value").then(function(snapshot) {
            totalPOqty = "Bundle : "+snapshot.val().bundle+" Box : "+snapshot.val().box;
            totalInvqty = "Bundle : "+data.val().bundle+" Box : "+data.val().box;
            bundleadd=parseInt(snapshot.val().bundle);
            boxadd=parseInt(snapshot.val().box);
            bundleadd=bundleadd+parseInt(data.val().bundle);
            boxadd=boxadd+parseInt(data.val().box);
            totalqtyInvPO ="Bundle : "+bundleadd+" Box : "+boxadd;
            add_invAndPOView_data_table(itemcodeInv,data.val().name,data.val().companyname,data.val().category,data.val().subcategory,totalInvqty,totalPOqty,totalqtyInvPO);
        });
        break;
      case "Bag-Kgs":
      database.ref('purchaseorder/'+itemcodeInv).once("value").then(function(snapshot) {
            totalPOqty = "Bag : "+snapshot.val().bag+" Kgs : "+snapshot.val().kgs;
            totalInvqty = "Bag : "+data.val().bag+" Kgs : "+data.val().kgs;
            bagadd=parseInt(snapshot.val().bag);
            kgsadd=parseInt(snapshot.val().kgs);
            bagadd=bagadd+parseInt(data.val().bag);
            kgsadd=kgsadd+parseInt(data.val().kgs);
            totalqtyInvPO ="Bag : "+bagadd+" Kgs : "+kgsadd;
            add_invAndPOView_data_table(itemcodeInv,data.val().name,data.val().companyname,data.val().category,data.val().subcategory,totalInvqty,totalPOqty,totalqtyInvPO);
        });
        break;//edit cube case
      case "Case-Tube":
      database.ref('purchaseorder/'+itemcodeInv).once("value").then(function(snapshot) {
            totalPOqty = "Case : "+snapshot.val().case+" Tube : "+snapshot.val().tube;
            totalInvqty = "Case : "+data.val().case+" Tube : "+data.val().tube;
            caseunitadd=parseInt(snapshot.val().case);
            tubeadd=parseInt(snapshot.val().tube);
            caseunitadd=caseunitadd+parseInt(data.val().case);
            tubeadd=tubeadd+parseInt(data.val().tube);
            totalqtyInvPO ="Case : "+caseunitadd+" Tube : "+tubeadd;
            add_invAndPOView_data_table(itemcodeInv,data.val().name,data.val().companyname,data.val().category,data.val().subcategory,totalInvqty,totalPOqty,totalqtyInvPO);
        });
        break;
      case "Case-Cone":
      database.ref('purchaseorder/'+itemcodeInv).once("value").then(function(snapshot) {
            totalPOqty = "Case : "+snapshot.val().case+" Cone : "+snapshot.val().cone;
            totalInvqty = "Case : "+data.val().case+" Cone : "+data.val().cone;
            caseunitadd=parseInt(snapshot.val().case);
            coneadd=parseInt(snapshot.val().cone);
            caseunitadd=caseunitadd+parseInt(data.val().case);
            coneadd=coneadd+parseInt(data.val().cone);
            totalqtyInvPO ="Case : "+caseunitadd+" Cone : "+coneadd;
            add_invAndPOView_data_table(itemcodeInv,data.val().name,data.val().companyname,data.val().category,data.val().subcategory,totalInvqty,totalPOqty,totalqtyInvPO);
        });
        break;
      case "Bag-Packets":
      database.ref('purchaseorder/'+itemcodeInv).once("value").then(function(snapshot) {
            totalPOqty = "Bag : "+snapshot.val().bag+" Packets : "+snapshot.val().packets;
            totalInvqty = "Bag : "+data.val().bag+" Packets : "+data.val().packets;
            bagadd=parseInt(snapshot.val().bag);
            packetsadd=parseInt(snapshot.val().packets);
            bagadd=bagadd+parseInt(data.val().bag);
            packetsadd=packetsadd+parseInt(data.val().packets);
            totalqtyInvPO ="Bag : "+bagadd+" Packets : "+packetsadd;
            add_invAndPOView_data_table(itemcodeInv,data.val().name,data.val().companyname,data.val().category,data.val().subcategory,totalInvqty,totalPOqty,totalqtyInvPO);
        });
        break;
      case "Bag-Pieces":
      database.ref('purchaseorder/'+itemcodeInv).once("value").then(function(snapshot) {
            totalPOqty = "Bag : "+snapshot.val().bag+" Piece : "+snapshot.val().piece;
            totalInvqty = "Bag : "+data.val().bag+" Piece : "+data.val().piece;
            bagadd=parseInt(snapshot.val().bag);
            pieceadd=parseInt(snapshot.val().piece);
            bagadd=bagadd+parseInt(data.val().bag);
            pieceadd=packetsadd+parseInt(data.val().piece);
            totalqtyInvPO ="Bag : "+bagadd+" Piece : "+pieceadd;
            add_invAndPOView_data_table(itemcodeInv,data.val().name,data.val().companyname,data.val().category,data.val().subcategory,totalInvqty,totalPOqty,totalqtyInvPO);
        });
        break;
      default:
        console.log("No package found");
    }


});
function add_invAndPOView_data_table(itemcode,productName,Company,Category,SubCategory,qtyInv,qtyPO,qtyInvPO){
  $("#viewInventoryTable").prepend('<tr id="' + itemcode + '"><th>' + itemcode + '</th><th>' + productName + '</th><th>' + Company + '</th><th>' + Category + '</th><th>' + SubCategory + '</th><th>' + qtyInv + '</th><th>' + qtyPO + '</th><th>' + qtyInvPO + '</th></tr>');
}
/* View Inventory Logic ends here */
//2662 editng
