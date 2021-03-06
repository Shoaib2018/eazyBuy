var selectOptions = ["+", "-"];
var nestedDiv = 1;
var nestedRowCount = 0;

function addNestedOptionTypeTable(optionTypeDiv, iIndex , jIndex) {
	//table
	var table = document.createElement('table');
	table.className = "table option-group table-borderless table-sm";

	var row1 = document.createElement('tr');
	var row2 = document.createElement('tr');

	//row1
	var r1td1 = document.createElement('td');
	r1td1.innerHTML = "<strong><font class = 'star'>*</font>"+"Option Group/Type</strong>";
	
	var r1td2 = document.createElement('td');
	var group = document.createElement('input');
	group.setAttribute("name", "nestedOptionGroup["+iIndex+"]["+jIndex+"]");
	//console.log(group.name);
	group.setAttribute("type", "text");
	group.setAttribute('placeholder', "Option Group");
	group.id = "optionGroup"+optionTypeDiv.id;
	r1td2.appendChild(group);

	row1.appendChild(r1td1);
	row1.appendChild(r1td2);

	//row2
	var r2td1 = document.createElement('td');
	r2td1.innerHTML = "<strong><font class = 'star'>*</font>"+"Input Type</strong>";

	var r2td2 = document.createElement('td');
	var select = document.createElement('select');
	select.id = "selectType"+optionTypeDiv.id;
	select.setAttribute("name", "nestedSelectType["+iIndex+"]["+jIndex+"]");

	//Create and append the options
	for (var i = 0; i < typeOptions.length; i++) {
	    var typeOption = document.createElement("option");
	    typeOption.value = typeOptions[i];
	    typeOption.text = typeOptions[i];
	    select.appendChild(typeOption);
	}
	r2td2.appendChild(select);

	row2.appendChild(r2td1);
	row2.appendChild(r2td2);

	table.appendChild(row1);
	table.appendChild(row2);
	
	//adding table into div
	optionTypeDiv.appendChild(table);
}

function addNestedOptionTableHeading(table) {
	var thead =  document.createElement('thead');
	thead.className = "thead-light";
	var row =  document.createElement('tr');

	//th
	var th0 = document.createElement('th');
	var th1 = document.createElement('th');
	th1.innerHTML = "Option";
	var th2 = document.createElement('th');
	th2.innerHTML = "Image";
	var th3 = document.createElement('th');

	//adding ths into heading row
	row.appendChild(th0);
	row.appendChild(th1);
	row.appendChild(th2);
	row.appendChild(th3);

	//adding row into thead
	thead.appendChild(row);
	//adding thead into table
	table.appendChild(thead);
}

function nestedMultiFileUpload(e, obj, divid, name, iIndex, jIndex, rowIndex) {
	jQuery.noConflict()(function ($) { 
		$(document).ready(function () {
			if (obj.get(0).files.length == 0) {
		        return;
		    }
			else if($("#slider-container"+obj.parent().parent().parent().parent().attr('id')+" img").length + 
				obj.get(0).files.length > 10) {
				$('#sorryImageCount').modal();
				return;
			}
			else {
				nestedUploadImage(e, obj.parent().parent().parent().parent().attr('id'), iIndex, jIndex, rowIndex);
				  	//fileinput.    label.    div.    cell.     tr.      id
				$(obj).parent().hide();

				var uploadBtnLabel = document.createElement("label");
				uploadBtnLabel.for = "uploadFile";
				uploadBtnLabel.className = "btn btn-light btn-sm rounded-label";
				uploadBtnLabel.title = "Upload Image";

				var uploadIcon = document.createElement("i");
				uploadIcon.className = "fas fa-camera";

				var fileInput = document.createElement('input');
				fileInput.setAttribute('type', 'file');
				fileInput.setAttribute("multiple", "multiple");
				fileInput.setAttribute("name", name);
				
	        	fileInput.addEventListener("change", function(e) {
	        		nestedMultiFileUpload(e, $(this), $(this).parent().parent().attr('id'), $(this).attr('name'), iIndex, jIndex, rowIndex)
				});

				uploadBtnLabel.appendChild(uploadIcon);
				uploadBtnLabel.appendChild(fileInput);

				$("#"+divid).append(uploadBtnLabel);
			}
	  	});
	});
}

function addSingleOptionRow(tbody, DivId, nestedDiv, i) {
	jQuery.noConflict()(function ($) { 
		$(document).ready(function () {
			var row =  document.createElement('tr');
			row.id = "row"+nestedRowCount+"div"+DivId;
			
			var cell0 = document.createElement('td');
			var cell1 = document.createElement('td');
			var cell2 = document.createElement('td');
			var cell3 = document.createElement('td');

			var iIndex = nestedDiv;
			var jIndex = i;
			var rowIndex = parseInt(document.getElementById("hiddenNestedRowCount"+DivId).value);

			var dfault = document.createElement('input');
			dfault.setAttribute("type", "checkbox");
			dfault.setAttribute("name", "nestedDefault["+iIndex+"]["+jIndex+"]["+rowIndex+"]");
			dfault.title = "Make Default";
			dfault.addEventListener("click", function(e) {
        		checkboxClick($(this));
			});
			cell0.align = "center";
			cell0.appendChild(dfault);

			var option = document.createElement('input');
			option.setAttribute('type', 'text');
			option.setAttribute('placeholder', "Option");
			option.id = "option"+nestedRowCount+"div"+DivId;
			option.setAttribute("name", "nestedOption["+iIndex+"]["+jIndex+"]["+rowIndex+"]");
			cell1.appendChild(option);

			//Image
			var uploadBtnDiv = document.createElement("div");
			uploadBtnDiv.id = "uploadBtnDiv"+row.id;

			var uploadBtnLabel = document.createElement("label");
			uploadBtnLabel.for = "uploadFile";
			uploadBtnLabel.className = "btn btn-light btn-sm rounded-label";
			uploadBtnLabel.title = "Upload Image";

			var uploadIcon = document.createElement("i");
			uploadIcon.className = "fas fa-camera";

			var fileInput = document.createElement('input');
			fileInput.setAttribute('type', 'file');
			fileInput.setAttribute("multiple", "multiple");
			fileInput.setAttribute("name", "nestedFile["+iIndex+"]["+jIndex+"]["+rowIndex+"][]");
			fileInput.addEventListener("change", function(e) {
	       		nestedMultiFileUpload(e, $(this), $(this).parent().parent().attr('id'), $(this).attr('name'), iIndex, jIndex, rowIndex)
			});

			uploadBtnLabel.appendChild(uploadIcon);
			uploadBtnLabel.appendChild(fileInput);
			uploadBtnDiv.appendChild(uploadBtnLabel);

			var slideCount = document.createElement('input');
			slideCount.setAttribute('type', 'hidden');
			slideCount.id = "nestedSlideCount"+row.id;
          	slideCount.value = 0;

			var sliderContainerDiv = document.createElement("div");
			sliderContainerDiv.className = "slider";
			sliderContainerDiv.id = "slider-container"+row.id;

			/*
			var prevBtnDiv = document.createElement("div");
			prevBtnDiv.className = "control-prev-btn";
			prevBtnDiv.id = "control-prev-btn"+row.id;
			prevBtnDiv.innerText = "<";
			prevBtnDiv.addEventListener('click', function() {
				prev($(this).parent().parent().parent().attr('id'));
			  		//prevbtndiv. div.      cell.     row.      id
			});

			var nextBtnDiv = document.createElement("div");
			nextBtnDiv.className = "control-next-btn";
			nextBtnDiv.id = "control-next-btn"+row.id;
			nextBtnDiv.innerText = ">";
			nextBtnDiv.addEventListener('click', function() {
				next($(this).parent().parent().parent().attr('id'));
				  	//prevbtndiv. div.      cell.     row.      id
			});

			sliderContainerDiv.appendChild(prevBtnDiv);		
			sliderContainerDiv.appendChild(nextBtnDiv);
			*/

			cell2.appendChild(uploadBtnDiv);
			cell2.appendChild(sliderContainerDiv);
			cell2.appendChild(slideCount);
			
			///remove
			var removeBtn = document.createElement("button");
			removeBtn.type = "button";
			removeBtn.className = "btn btn-danger";
			removeBtn.title = "Remove";

			var icon = document.createElement("i");
			icon.className = "fa fa-minus-circle";

			removeBtn.appendChild(icon);

			cell3.appendChild(removeBtn);
			removeBtn.addEventListener("click", function() {
		  		removeOptionRow(row);
			});

			//adding cell into row
			row.appendChild(cell0);
			row.appendChild(cell1);
			row.appendChild(cell2);
			row.appendChild(cell3);
			//adding row into tbody
			tbody.appendChild(row);

			document.getElementById("hiddenNestedRowCount"+DivId).value = rowIndex+1;
			
			nestedRowCount++;
		});
	});
}

function addNestedOptionTableFoot(table, nestedDiv, i){
	jQuery.noConflict()(function ($) { 
		$(document).ready(function () {
			var tfoot =  document.createElement('tfoot');
			var row =  document.createElement('tr');
			var cell =  document.createElement('td');

			//cell
			cell.className = "option-add-td";
			cell.colSpan = "4";
			cell.align = "left";
			//button
			var button =  document.createElement('button');
			button.setAttribute('type', 'button');
			button.className = "btn btn-primary";
			button.title = "Add Row";
			button.addEventListener("click", function() {
		  		addSingleOptionRow(table.tBodies[0],
		  			//$(this).parent().parent().parent().parent().parent().attr('id'));
		  			$(this).parent().parent().parent().parent().parent().parent().attr('id'), nestedDiv, i);
		  			//button. cell.     row.    tfoot.   table.    div.     div    id
			});
			//icon
			var icon = document.createElement('i');
			icon.className = "fa fa-plus-circle";
			//addIcon.aria-hidden = "true";

			//adding icon into button
			button.appendChild(icon);
			//adding button into cell
			cell.appendChild(button);
			//adding cell into row
			row.appendChild(cell);
			//adding row into foot
			tfoot.appendChild(row);
			//adding foot into table
			table.appendChild(tfoot);
		});
	});
}

function addNestedOptionTable(optionDiv, nestedDiv, i) {
	//table
	var table = document.createElement('table');
	table.className = "table nested-option-table table-bordered table-striped table-sm";

	var tbody = document.createElement('tbody');
	tbody.className = "singleOptionTableTbody";

	//call 
	addNestedOptionTableHeading(table);
	table.appendChild(tbody);
	addNestedOptionTableFoot(table, nestedDiv, i);
	
	//adding table into div
	optionDiv.appendChild(table);
}

function makeComboTable(list, DivId) {
	if (document.getElementById('combinationTableDiv'+DivId)) {
		var oldDiv = document.getElementById('combinationTableDiv'+DivId);
		oldDiv.remove();
	}

	var div = document.getElementById(DivId);
	var table = document.createElement('table');
	table.className = "table combination-table table-bordered table-striped table-sm";

	var thead =  document.createElement('thead');
	thead.className = "thead-light";
	var hrow =  document.createElement('tr');

	//th
	var th0 = document.createElement('th');
	th0.innerHTML = "Combination";
	var th1 = document.createElement('th');
	th1.innerHTML = "SKU";
	var th2 = document.createElement('th');
	th2.innerHTML = "St.Qty";
	var th3 = document.createElement('th');
	th3.innerHTML = "Buying Price";
	var th4 = document.createElement('th');
	th4.innerHTML = "Selling Price";

	//adding ths into heading row
	hrow.appendChild(th0);
	hrow.appendChild(th1);
	hrow.appendChild(th2);
	hrow.appendChild(th3);
	hrow.appendChild(th4);

	//adding row into thead
	thead.appendChild(hrow);

	var tbody = document.createElement('tbody');
    var iIndex = parseInt(DivId.match(/\d/g).join(""));

	for (var i = 0; i < list.length; i++) {
		var brow =  document.createElement('tr');
		var cell0 =  document.createElement('td');

		var hidden = document.createElement('input');
		hidden.setAttribute('type', 'hidden');
		hidden.id = "hidden"+i+"div"+DivId;
		hidden.name = "comboOption["+iIndex+"][]";

		var iLength = list[i].length;
		for (var j = 0; j < iLength; j++) {
			if (j < iLength-1) {
				cell0.innerText += list[i][j]+"-";
			}
			else {
				cell0.innerText += list[i][j];
			}
		}
		hidden.value = cell0.innerText;
		cell0.appendChild(hidden);
		brow.appendChild(cell0);

		var cell1 =  document.createElement('td');
		var sku = document.createElement('input');
		sku.setAttribute('type', 'text');
		sku.setAttribute('placeholder', "SKU");
		sku.id = "sku"+i+"div"+DivId;
		sku.name = "comboSKU["+iIndex+"][]";
		cell1.appendChild(sku);
		brow.appendChild(cell1);

		var cell2 =  document.createElement('td');
		var quantity = document.createElement('input');
		quantity.setAttribute('type', 'number');
		quantity.setAttribute("min", "0");
		quantity.setAttribute('placeholder', "St.Qty");
		quantity.id = "quantity"+i+"div"+DivId;
		quantity.name = "comboQuantity["+iIndex+"][]";
		quantity.addEventListener('keydown',preventDot, false);
		quantity.addEventListener('paste', preventPaste, false);
		quantity.addEventListener('input', preventInput, false);
		cell2.appendChild(quantity);
		brow.appendChild(cell2);

		var cell3 =  document.createElement('td');
		var selectBuyVar = document.createElement('select');
		selectBuyVar.id = "selectBuyVar"+i+"div"+DivId;
		selectBuyVar.name = "comboSelectBuy["+iIndex+"][]";
		selectBuyVar.className = "price-select";
		//Create and append the options
		for (var k = 0; k < selectOptions.length; k++) {
		    var selectOption = document.createElement("option");
		    selectOption.value = selectOptions[k];
		    selectOption.text = selectOptions[k];
		    selectBuyVar.appendChild(selectOption);
		}

		var buyingPrice = document.createElement('input');
		buyingPrice.setAttribute('type', 'number');
		buyingPrice.setAttribute("min", "0");
		buyingPrice.setAttribute('placeholder', "Amount");
		buyingPrice.className = "price";
		buyingPrice.id = "buyingPrice"+i+"div"+DivId;
		buyingPrice.name = "comboBuyingPrice["+iIndex+"][]";
		buyingPrice.addEventListener('paste', preventStringPaste, false);
		cell3.appendChild(selectBuyVar);
		cell3.appendChild(buyingPrice);
		brow.appendChild(cell3);

		var cell4 =  document.createElement('td');
		var selectSellVar = document.createElement('select');
		selectSellVar.id = "selectSellVar"+i+"div"+DivId;
		selectSellVar.name = "comboSelectSell["+iIndex+"][]";
		selectSellVar.className = "price-select";
		//Create and append the options
		for (var k = 0; k < selectOptions.length; k++) {
		    var selectOption = document.createElement("option");
		    selectOption.value = selectOptions[k];
		    selectOption.text = selectOptions[k];
		    selectSellVar.appendChild(selectOption);
		}

		var sellingPrice = document.createElement('input');
		sellingPrice.setAttribute('type', 'number');
		sellingPrice.setAttribute("min", "0");
		sellingPrice.setAttribute('placeholder', "Amount");
		sellingPrice.className = "price";
		sellingPrice.id = "sellingPrice"+i+"div"+DivId;
		sellingPrice.name = "comboSellingPrice["+iIndex+"][]";
		sellingPrice.addEventListener('paste', preventStringPaste, false);
		cell4.appendChild(selectSellVar);
		cell4.appendChild(sellingPrice);
		brow.appendChild(cell4);

		tbody.appendChild(brow);
	}

	//adding thead and tbody into table
	table.appendChild(thead);
	table.appendChild(tbody);

	var combinationTableDiv = document.createElement('div');
	combinationTableDiv.id = 'combinationTableDiv'+DivId;	
	combinationTableDiv.className = 'combination-table-div';
	combinationTableDiv.appendChild(table);

	div.appendChild(combinationTableDiv);
}

function combos(list, n = 0, result = [], current = []){
    if (n === list.length) result.push(current)
    else list[n].forEach(item => combos(list, n+1, result, [...current, item]))

	return result;
}


function makeList(DivId) {
	var div = document.getElementById(DivId);
	var allTbody = div.getElementsByClassName('singleOptionTableTbody');

	var list = new Array();
	for (var i = 0; i < allTbody.length; i++) {
		list[i] = new Array();
		for (var j = 0; j < allTbody[i].rows.length; j++) {
			list[i][j] = allTbody[i].rows[j].cells[1].firstChild.value;

			//if (list[i] == null)
	          //  list[i] = allTbody[i].rows[j].cells[1].firstChild.value;
	        //else
	          //  list[i].push(allTbody[i].rows[j].cells[1].firstChild.value);
		}
	}

	var list = combos(list);
	makeComboTable(list, DivId)
}

function changeButton(id) {
	var makeCombinationbutton = document.getElementById(id);
	var redo = document.createElement('i');
	redo.className = "fas fa-redo";
	makeCombinationbutton.title = "Redo Combination";
	makeCombinationbutton.innerText = "";
	makeCombinationbutton.appendChild(redo);
}

function addNestedOptionGroup(optionGroupNumber) {
	jQuery.noConflict()(function ($) { 
		$(document).ready(function () {
			var hiddenOptionGroupNumber = document.createElement('input');
			hiddenOptionGroupNumber.setAttribute('type', 'hidden');
			hiddenOptionGroupNumber.setAttribute("name", "hiddenOptionGroupNumber["+nestedDiv+"]");
			hiddenOptionGroupNumber.setAttribute("value", optionGroupNumber);

			var nestedOptionDiv = document.createElement('div');
			nestedOptionDiv.id = 'nestedOption'+nestedDiv;
			nestedOptionDiv.className = 'nested-option';

			addRemoveDiv(nestedOptionDiv);

			//nestedoption div
			for (var i = 0; i < optionGroupNumber; i++) {
				//option type table div
				var optionTypeDiv = document.createElement('div');
				optionTypeDiv.id = 'nestedOptionType'+nestedDiv+"option"+i;
				optionTypeDiv.className = "option-type-div";

				//option table div
				var optionTableDiv = document.createElement('div');
				optionTableDiv.id = 'nestedOptionTable'+nestedDiv+"option"+i;
				optionTableDiv.className = "option-table-div";

				var optionDiv = document.createElement('div');
				optionDiv.id = 'nestedOption'+nestedDiv+"option"+i;
				optionDiv.className = "single-option";
				
				//addOptionTypeTable(option);
				addNestedOptionTypeTable(optionTypeDiv, nestedDiv, i);
				addNestedOptionTable(optionTableDiv, nestedDiv, i);

				var hiddenRowCount = document.createElement('input');
				hiddenRowCount.setAttribute('type', 'hidden');
				hiddenRowCount.setAttribute("value", "0");
				hiddenRowCount.setAttribute("name", "hiddenNestedRowCount["+nestedDiv+"]["+i+"]");
				hiddenRowCount.id = "hiddenNestedRowCount"+optionDiv.id;
				//console.log(hiddenRowCount.id);

				optionDiv.appendChild(optionTypeDiv);
				optionDiv.appendChild(optionTableDiv);
				optionDiv.appendChild(hiddenRowCount);

				nestedOptionDiv.appendChild(optionDiv);
			}

			var makeCombinationbutton = document.createElement('button');
			makeCombinationbutton.setAttribute('type', 'button');
			makeCombinationbutton.id = "makeCombinationbutton"+nestedDiv;
			makeCombinationbutton.innerText = "Make Combination";
			makeCombinationbutton.className = "btn btn-success btn-sm make-combination";
			makeCombinationbutton.addEventListener("click", function() {
				makeList($(this).parent().attr('id'));
				  		//button.  div.      id
				changeButton($(this).attr('id'));
			});

			nestedOptionDiv.appendChild(makeCombinationbutton);
			nestedOptionDiv.appendChild(hiddenOptionGroupNumber);

			//adding every nested option div into main option div
			var mainDiv = document.getElementById("main-div");
			mainDiv.appendChild(nestedOptionDiv);

			var hiddenNestedGroupCount = document.getElementById("hiddenNestedGroupCount");
			hiddenNestedGroupCount.value = nestedDiv;

			nestedDiv++;
		});
	});
}