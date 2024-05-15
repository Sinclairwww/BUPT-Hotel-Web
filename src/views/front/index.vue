<template>
  <div class="wrapper">
    <div class="table-wrapper">
      <ele-table :tableData="frontTableData" :tableTitle="frontTableTitle" :operate="operate" :needList="needList"
        @book="handleBook($event)" @unbook="handleUnbook($event)" @live="handleSetLive($event)" @leave="handleSetLeave($event)"></ele-table>
    </div>
    <div class="pagination-wrapper">
      <pagination v-if="pagination.total" :pagination="pagination" @change="handlePageChange(arguments)"></pagination>
    </div>
    <el-dialog :close-on-click-modal="false" title="预定房间" :visible.sync="frontAdd" width="45%" :before-close="handleFrontDialogClose">
      <el-form :inline="true" :rules="rules" :model="frontAddQuery" ref="frontAddQuery">
        <el-form-item label="预约时间" prop="bookTime">
          <el-date-picker v-model="frontAddQuery.bookTime" type="datetime" placeholder="选择预计入住时间" format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerDate">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="顾客姓名" prop="customerName">
          <el-input v-model="frontAddQuery.customerName"></el-input>
        </el-form-item>
        <el-form-item label="顾客身份证号" prop="customerIdentity">
          <el-input type="number" v-model="frontAddQuery.customerIdentity"></el-input>
        </el-form-item>
        <el-form-item label="顾客联系方式" prop="tel">
          <el-input v-model="frontAddQuery.tel" :disabled="liveIsBook"></el-input>
        </el-form-item>
        <el-form-item label="押金" prop="deposit">
          <el-input v-model="frontAddQuery.deposit" :disabled="liveIsBook"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFrontDialogClose()">取 消</el-button>
        <el-button type="primary" @click="handleFrontFormSubmit()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" title="办理入住" :visible.sync="frontLive" width="45%" :before-close="handleFrontLiveDialogClose">
      <el-form :inline="true" :rules="rules" :model="frontLiveQuery" ref="frontLiveQuery">
        <el-form-item label="入住时间" prop="livetime">
          <div class="livetime">
            当前时间
          </div>
        </el-form-item>
        <el-form-item label="顾客姓名" prop="customerName">
          <el-input v-model="frontLiveQuery.customerName" :disabled="liveIsBook"></el-input>
        </el-form-item>
        <el-form-item label="顾客身份证号" prop="customerIdentity">
          <el-input v-model="frontLiveQuery.customerIdentity" :disabled="liveIsBook"></el-input>
        </el-form-item>
        <el-form-item label="顾客联系方式" prop="tel">
          <el-input v-model="frontLiveQuery.tel" :disabled="liveIsBook"></el-input>
        </el-form-item>
        <el-form-item label="押金" prop="deposit">
          <el-input v-model="frontLiveQuery.deposit" :disabled="liveIsBook"></el-input>
        </el-form-item>
        <el-form-item label="预计退房时间" prop="preLiveTime">
          <el-date-picker v-model="frontLiveQuery.preLiveTime" type="datetime" placeholder="选择预计退房时间" format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerDate">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleFrontLiveDialogClose()">取 消</el-button>
        <el-button type="primary" @click="handleFrontLiveFormSubmit()">确 定</el-button>
      </span>
    </el-dialog>
    <dialogDelete ref="dialogDelete" @dialogClose="handleDel($event)">
      <span style>确认要取消订房吗？</span>
    </dialogDelete>
    <dialogDelete ref="dialogLive" @dialogClose="handleRoomLeave($event)">
      <span style>确认要退房吗？</span>
    </dialogDelete>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';

const pickerDate = {
  disabledDate: time => {
    return time.getTime() < (Date.now() - 86400000);
  },
  shortcuts: [
    {
      text: '一天',
      onClick(picker) {
        picker.$emit('pick', new Date() + 3600 * 1000 * 24);
      }
    },
    {
      text: '两天',
      onClick(picker) {
        const date = new Date();
        date.setTime(date.getTime() + 3600 * 1000 * 24 * 2);
        picker.$emit('pick', date);
      }
    },
    {
      text: '三天',
      onClick(picker) {
        const date = new Date();
        date.setTime(date.getTime() + 3600 * 1000 * 24 * 3);
        picker.$emit('pick', date);
      }
    },
    {
      text: '四天',
      onClick(picker) {
        const date = new Date();
        date.setTime(date.getTime() + 3600 * 1000 * 24 * 4);
        picker.$emit('pick', date);
      }
    },
    {
      text: '一周',
      onClick(picker) {
        const date = new Date();
        date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
        picker.$emit('pick', date);
      }
    }
  ]
};

const operate = {
  book: true,
  live: true
};

const needList = {
  isBook: true,
  isRent: true,
  isClean: true,
  isLive: true
};

const frontQuery = reactive({
  page: 1,
  size: 10,
  type: "",
  roomtype: ""
});

const frontTableTitle = [
  {
    th: "房间号",
    td: "number"
  },
  {
    th: "入住时间",
    td: "livetime"
  },
  {
    th: "顾客姓名",
    td: "customerName"
  },
  {
    th: "顾客联系方式",
    td: "tel"
  },
  {
    th: "预计退房时间",
    td: "preLiveTime"
  },

];

const frontTableData = ref([]);
const pagination = reactive({
  total: "",
  page: "",
  size: ""
});

const frontAdd = ref(false);
const frontAddQuery = reactive({
  id: "",
  bookTime: "",
  customerName: "",
  customerIdentity: "",
  tel: "",
  deposit: ""
});

const delrow = ref("");

const loading = ref(false);

// 办理入住
const frontLive = ref(false);
const frontLiveQuery = reactive({
  id: "",
  livetime: "",
  customerName: "",
  customerIdentity: "",
  preLiveTime: "",
  tel: "",
  deposit: ""
});
const liveIsBook = ref(false);
const leaveRow = ref("");

const rules = {
  bookTime: {
    required: true,
    message: "预计入住时间不能为空",
    trigger: "blur"
  },
  customerName: {
    required: true,
    message: "顾客姓名不能为空",
    trigger: "blur"
  },
  customerIdentity: {
    required: true,
    message: "顾客身份证号不能为空",
    trigger: "blur"
  },
  tel: {
    required: true,
    message: "顾客联系方式不能为空",
    trigger: "blur"
  }
};

// 退房
function handleSetLeave(row) {
  // leaveRow.value = row;
  // $refs.dialogLive.dialogOpen = true;
}

function handleRoomLeave(type) {
  // if (type) {
  //   let leaveTime = new Date().getTime();
  //   let time_diff = leaveTime - new Date(leaveRow.value.livetime).getTime();
  //   let days = Math.ceil(time_diff / (24 * 3600 * 1000));
  //   if (days < 1) {
  //     $message.error('时间计算有误');
  //     return;
  //   }
  //   leaveTime = $Methods.getStandardTime(leaveTime);
  //   $Service.leaveFront({
  //     id: leaveRow.value.id
  //   }).then(res => {
  //     if (res.code == 1) {
  //       $Service.saveRoomRecord({
  //         number: leaveRow.value.number,
  //         totalPrice: days * leaveRow.value.price,
  //         bookTime: leaveRow.value.booktime,
  //         liveTime: leaveRow.value.livetime,
  //         customerName: leaveRow.value.customerName,
  //         customerIdentity: leaveRow.value.customerIdentity,
  //         preLiveTime: leaveRow.value.preLiveTime,
  //         tel: leaveRow.value.tel,
  //         deposit: leaveRow.value.deposit,
  //         leaveTime
  //       }).then(res => {
  //         if (res.code == 1) {
  //           $message({
  //             message: '退房成功，请到收银管理查看',
  //             type: 'success'
  //           });
  //           $refs.dialogLive.dialogOpen = false;
  //           leaveRow.value = "";
  //           __getFrontList();
  //         }
  //       })

  //     } else {
  //       $message.error('退房失败');
  //     }
  //   })
  // } else {
  //   leaveRow.value = "";
  // }
}

// 办理入住
function handleSetLive(row) {
  frontLiveQuery.id = row.id;
  if (row.isBook) {
    frontLiveQuery.customerName = row.customerName;
    frontLiveQuery.customerIdentity = row.customerIdentity;
    frontLiveQuery.tel = row.tel;
    frontLiveQuery.deposit = row.deposit;
    liveIsBook.value = true;
  }
  frontLive.value = true;
}

function handleFrontLiveDialogClose() {
  frontLive.value = false;
  liveIsBook.value = false;
  Object.assign(frontLiveQuery, $options.data().frontLiveQuery);
}

// 提交入住表单
function handleFrontLiveFormSubmit() {
  // frontLiveQuery.livetime = $Methods.getStandardTime(new Date());
  // $refs["frontLiveQuery"].validate(valid => {
  //   if (valid) {
  //     $Service.liveFront(frontLiveQuery).then(res => {
  //       if (res.code == 1) {
  //         $message({
  //           message: '登记入住客房成功',
  //           type: 'success'
  //         });
  //         handleFrontLiveDialogClose();
  //         __getFrontList();
  //       } else {
  //         $message.error('登记入住客房失败');
  //       }
  //     });
  //   }
  // });
}

function handlePageChange(data) {
  if (data[0] == "size" && frontQuery.size !== data[1]) {
    frontQuery.page = 1;
    frontQuery.size = data[1];
    __getFrontList();
  } else if (data[0] == "page" && frontQuery.page !== data[1]) {
    frontQuery.page = data[1];
    __getFrontList();
  }
}

// 取消预订
function handleUnbook(row) {
  // delrow.value = row;
  // $refs.dialogDelete.dialogOpen = true;
}

function handleDel(type) {
  // if (type) {
  //   $Service.unbookRoom({
  //     id: delrow.value.id
  //   }).then(res => {
  //     if (res.code == 1) {
  //       $message({
  //         message: '取消客房预定成功',
  //         type: 'success'
  //       });
  //       $refs.dialogDelete.dialogOpen = false;
  //       delrow.value = "";
  //       __getFrontList();
  //     } else {
  //       $message.error('取消客房预定失败');
  //     }
  //   })
  // } else {
  //   delrow.value = "";
  // }
}

// 预定事件，打开预定对话框
function handleBook(row) {
  frontAddQuery.id = row.id;
  frontAdd.value = true;
}

function handleAddFront() {
  frontAdd.value = true;
}

function handleFrontDialogClose() {
  frontAdd.value = false;
  Object.assign(frontAddQuery, $options.data().frontAddQuery);
}

function handleFrontFormSubmit() {
  // $refs["frontAddQuery"].validate(valid => {
  //   if (valid) {
  //     $Service.bookFront(frontAddQuery).then(res => {
  //       if (res.code == 1) {
  //         $message({
  //           message: '预定客房成功',
  //           type: 'success'
  //         });
  //         handleFrontDialogClose();
  //         __getFrontList();
  //       } else {
  //         $message.error('预定客房失败');
  //       }
  //     });
  //   }
  // });
}

// function __getFrontList() {
//   // $Service.getFrontList(frontQuery).then(res => {
//   //   if (res.code == 1) {
//   //     frontTableData.value = res.data.rows;
//   //     pagination.total = res.data.total;
//   //     pagination.page = res.data.page;
//   //     pagination.size = res.data.size;
//   //   } else {
//   //     $message.error(res.message);
//   //   }
//   // })
// }

import bookInfo from '/src/api/mock/front/bookInfo.json'

function getFrontListFromJson(){
      frontTableData.value = bookInfo.rows;
      pagination.total = bookInfo.total;
      pagination.page = bookInfo.page;
      pagination.size = bookInfo.size;
}

watch([frontQuery.type, frontQuery.q, frontQuery.roomtype], () => {
  if (loading.value) {
    return;
  }
  loading.value = true;
  setTimeout(() => {
    getFrontListFromJson()
    loading.value = false;
  }, 500);
});

onMounted(() => {
  getFrontListFromJson();
});
</script>

<style scoped>
  /* >>>.el-form--inline .el-form-item__label {
    width: 120px !important;
  }

  >>>.el-form-item__content .el-input__inner {
    width: 220px !important;
  } */

  .livetime {
    width: 220px;
  }

  .search-wrapper {
    float: right;
  }

  .search-wrapper .input-wrapper {
    float: right;
    margin-right: 10px;
  }

  .search-wrapper .select-wrapper {
    float: right;
  }

  .search-wrapper .select-wrapper+.select-wrapper {
    float: right;
    margin-right: 10px;
  }

  /* >>>.search-wrapper .el-input__inner {
    width: 220px !important;
  } */

  .wrapper {
    margin: 36px;
    margin-bottom: 0;
    width: auto;
  }



  .table-wrapper {
    margin-top: 18px;
  }

  .pagination-wrapper {
    margin: 18px 0;
    margin-left: -10px;
  }
</style>
