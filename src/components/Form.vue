<template>
  <b-container>
    <!-- <div v-if="error.length>0">
        <p v-for="e in error" :key="e.id">
            {{e | Ucase}}
        </p>
    </div>-->
    <slot name="sas"></slot>
    <b-form @submit.prevent="handleSubmit" id="drop-form" @drop="handleFileDrop( $event )">
      <b-form-input
        type="text"
        v-validate="'required|min:6'"
        name="title"
        id="title"
        v-model="expenseData.title"
        placeholder="Expense Title"
        :class="{ 'is-invalid': submitted && errors.has('title') }"
      ></b-form-input>
      <span
        v-if="submitted && errors.has('title')"
        class="invalid-feedback"
      >{{ errors.first('title') }}</span>
      <b-form-input
        type="text"
        v-validate="'required|numeric'"
        name="amount"
        id="amount"
        v-model="expenseData.amount"
        placeholder="Enter Amount"
        :class="{ 'is-invalid': submitted && errors.has('amount') }"
      ></b-form-input>
      <span
        v-if="submitted && errors.has('amount')"
        class="invalid-feedback"
      >{{ errors.first('amount') }}</span>
      <label for="example-datepicker">Choose Expense date</label>
    <b-form-datepicker id="example-datepicker" v-validate="'required'" name="date" v-model="expenseData.date" class="mb-2"></b-form-datepicker>
     <span
        v-if="submitted && errors.has('date')"
        class="invalid-feedback"
      >{{ errors.first('date') }}</span>
      <b-form-group id="input-group-3" label="Paid by:" label-for="input-3">
        <b-select
          id="input-3"
          v-validate="'required'"
          :options="flatmates"
          name="paid_by"
          v-model="expenseData.paidby"
          :class="{ 'is-invalid': submitted && errors.has('paid_by') }"
        ></b-select>
      </b-form-group>
      <span
        v-if="submitted && errors.has('paid_by')"
        class="invalid-feedback"
      >Please select the payer</span>
      <span class="drop-files">Drop the expense bills here!</span>
      <b-button type="submit" variant="primary">Add Expense</b-button>
    </b-form>
    <br />
    <div v-if="files" class="file-listing">
      <img class="preview" v-bind:id="'drag-and-drop-preview'" />
      {{ files.name }}
      <div class="remove-container">
        <a class="remove" v-on:click="removeFile()">Remove</a>
      </div>
    </div>
    <div>
      <b-form-input type="text" v-model="search" placeholder="Search Expenses Here"></b-form-input>
    </div>
    <br />

    <transition appear name="fade">
      <table v-if="filterExpense" ref="testHtml">
        <tr>
          <th>Expense Title</th>
          <th>Expense Amount</th>
          <th>Expense Date</th>
          <th>Expense Paid By</th>
          <th>Bill</th>
          <th>Action</th>
        </tr>
        <tr v-for="data in filterExpense" :key="data.id">
          <td>{{ data.title }}</td>
          <td>{{ data.amount | formatCurrency }}</td>
          <td>{{ data.date | formatDate }}</td>
          <td>{{ data.paidby }}</td>
          <td>
            <a v-if="data.files" target="_blank">
              <img v-bind:src="data.files" height="50" width="50" class="zoom" />
            </a>
            <p v-else>-</p>
          </td>
          <td>
            <b-icon
              v-bind:style="{'cursor':'pointer'}"
              icon="trash-fill"
              aria-hidden="true"
              variant="danger"
              @click="deleteExpense(data.id)"
            ></b-icon>
          </td>
        </tr>
        <tr>
          <td colspan="5">Total expense paid : {{ totalExpense | formatCurrency }}</td>
        </tr>
      </table>
      <br />
    </transition>
    <md-button class="md-dense md-primary" v-on:click="generatePdf()">generate PDF</md-button>
  </b-container>
</template>

<script>
// import VueHtml2pdf from 'vue-html2pdf'
import Vue from "vue";
import jsPDF from "jspdf";

Vue.use(jsPDF);

export default {
  name: "Form",
  components: {
    // VueHtml2pdf
  },
  data() {
    return {
      expenseData: {
        title: null,
        amount: null,
        paidby: null,
        files: null,
        date:null
      },
      items: this.$store.state.items,
      // error: [],
      dragAndDropCapable: false,
      files: null,
      uploadPercentage: 0,
      search: null,
      submitted: false,
      flatmates: [
        {
          text: "Select One",
          value: null,
        },
        "Parth",
        "pranav",
        "Harshit",
        "Rakesh",
      ],
      LoggedInUser: localStorage.getItem("loggedInUser"),
    };
  },
  props: {
    LoggedUser: { type: Function },
  },
  methods: {
    handleSubmit() {
      // this.error = [];
      // if (this.expenseData.title == null) {
      //     this.error.push("Please provide title");
      // }
      // if (this.expenseData.amount == null) {
      //     this.error.push("Please provide amount");
      // }
      // if (this.expenseData.paidby == null) {
      //     this.error.push("Please select payer");
      // }
      this.submitted = true;
      this.$validator.validate().then((valid) => {
        if (valid) {
          console.log(this.files);
          this.$store.dispatch("AddExpense", this.expenseData);
          this.expenseData.title = null;
          this.expenseData.amount = null;
          this.expenseData.paidby = null;
          this.expenseData.files = null;
          this.expenseData.date = null;
          this.files = null;
          this.$validator.reset();
        }
      });
    },
    deleteExpense(id) {
      this.$store.dispatch("deleteExpense", {
        deleteId: id,
      });
    },
    bindEvents() {
      /*
					Listen to all of the drag events and bind an event listener to each
					for the fileform.
				*/
      [
        "drag",
        "dragstart",
        "dragend",
        "dragover",
        "dragenter",
        "dragleave",
        "drop",
      ].forEach(
        function (evt) {
          /*
						For each event add an event listener that prevents the default action
						(opening the file in the browser) and stop the propagation of the event (so
						no other elements open the file in the browser)
					*/
          document.getElementById("drop-form").addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
        }.bind(this)
      );
    },

    handleFileDrop(event) {
      this.files = event.dataTransfer.files;

      this.getImagePreviews();
    },

    determineDragAndDropCapable() {
      /*
					Create a test element to see if certain events
					are present that let us do drag and drop.
				*/
      var div = document.createElement("div");

      /*
					Check to see if the `draggable` event is in the element
					or the `ondragstart` and `ondrop` events are in the element. If
					they are, then we have what we need for dragging and dropping files.
			
					We also check to see if the window has `FormData` and `FileReader` objects
					present so we can do our AJAX uploading
				*/
      return (
        ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
        "FormData" in window &&
        "FileReader" in window
      );
    },

    getImagePreviews() {
      /*
					Iterate over all of the files and generate an image preview for each one.
				*/
      /*
						Ensure the file is an image file
                    */
      console.log(this.files[0]);
      if (/\.(jpe?g|png|gif)$/i.test(this.files[0].name)) {
        /*
							Create a new FileReader object
						*/
        let reader = new FileReader();

        /*
							Add an event listener for when the file has been loaded
							to update the src on the file preview.
						*/
        reader.addEventListener(
          "load",
          function () {
            this.expenseData.files = reader.result;
            document.getElementById("drag-and-drop-preview").src =
              reader.result;
          }.bind(this),
          false
        );

        /*
							Read the data for the file in through the reader. When it has
							been loaded, we listen to the event propagated and set the image
							src to what was loaded from the reader.
						*/
        reader.readAsDataURL(this.files[0]);
      } else {
        /*
							We do the next tick so the reference is bound and we can access it.
						*/
        this.$nextTick(function () {
          document.getElementById("drag-and-drop-preview").src =
            "/images/file.png";
        });
      }
    },

    removeFile() {
      this.files = null;
      this.getImagePreviews();
    },
    generatePdf() {
      const doc = new jsPDF("l", "pt", "a3", true);
      // let handleElement = {
      //   '#editor': function (element, renderer) {
      //     return true;
      //   }
      // };
      console.log(this.$refs.testHtml.innerHTML);
      doc.setLineWidth(0.5);
      doc.line(20, 25, 60, 25);
      doc.html(this.$refs.testHtml, {
        x: 15,
        y: 15,
        width: 50,
        callback: function (doc) {
          doc.save("test.pdf");
        },
      });

      // doc.save('test.pdf');
    },
  },
  created() {
    this.$store.dispatch("getExpenses");
    console.log("form-submit", this.submitted);
    console.log("errors", this.$validator.errors);
  },

  mounted() {
    this.$emit("LoggedUser", this.LoggedInUser);
    this.dragAndDropCapable = this.determineDragAndDropCapable();

    /*
				If drag and drop capable, then we continue to bind events to our elements.
			*/
    if (this.dragAndDropCapable) {
      this.bindEvents();
    }
  },
  computed: {
    filterExpense() {
      if (this.search) {
        console.log(this.search.toLowerCase().split(" "));
        return this.$store.state.items.filter((item) => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every((v) => item.title.toLowerCase().includes(v));
        });
      } else {
        return this.$store.state.items;
      }
    },
    totalExpense() {
      return this.$store.getters.getTotalExpense;
    },
  },
  watch: {
    items(val) {
      console.log("here", val);
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border: 1px solid black;
}
.drop-files {
  display: block;
  height: 100px;
  width: 250px;
  background: #ccc;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  line-height: 100px;
  border-radius: 4px;
}
th,
td {
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.fade-enter-active {
  animation: bounceIn 2s;
}

.fade-leave-active {
  animation: bounceIn 2s reverse;
}

@keyframes bounceIn {
  0% {
    transform: scale(0.1);
    opacity: 0;
  }
  60% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}

.preview {
  height: 100px;
}

.zoom:hover {
  transform: scale(
    2
  ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
</style>
