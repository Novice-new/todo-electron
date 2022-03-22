<template>
  <el-dialog
    :title="type === 'add' ? '添加任务' : '编辑任务'"
    :visible.sync="visible"
    width="500px"
    @close="beforeClose"
    @open="beforeOpen"
  >
    <el-form ref="form" v-loading="loading" :model="form" status-icon :rules="rules" size="small">
      <el-form-item label="任务名称" label-width="80px" prop="name">
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入任务名称" />
      </el-form-item>
      <el-form-item label="优先级" label-width="80px" prop="level">
        <el-select v-model="form.level" placeholder="请选择优先级">
          <el-option label="level one" :value="1" />
          <el-option label="level two" :value="2" />
          <el-option label="level three" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="日期" label-width="80px" prop="time">
        <el-date-picker
          v-model="form.time"
          type="date"
          placeholder="请选择日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="visible = false">取 消</el-button>
      <el-button type="primary" size="small" @click="handleSure('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addTodo, getTodoDetail, editTodo } from "@/api/todo";
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  props: {
    // 弹窗类型：分为add ： edit
    type: {
      default: () => "add",
    },
    // 初始时间
    initTime: {
      default: () => moment().format("YYYY-MM-DD"),
    },
    // id（类型为编辑时需通过id获取详细信息）
    id: {
      default: "",
    },
  },
  data() {
    return {
      loading: false,
      visible: false,
      form: {
        name: "",
        level: "",
        time: "",
      },
      rules: {
        name: [{ required: true, trigger: "blur", message: "请输入任务名" }],
        level: [{ required: true, trigger: "blur", message: "请选择优先级" }],
        time: [{ required: true, trigger: "blur", message: "请选择日期" }],
      },
    };
  },
  computed: {
    ...mapGetters(["user", "time"]),
  },
  methods: {
    // 关闭弹窗之前的回调
    beforeClose() {
      this.$refs.form.resetFields();
    },
    // 通过id获取详细信息并回填表单
    getTodoDetail() {
      this.loading = true;
      getTodoDetail(this.id).then((res) => {
        const result = res.data;
        this.form = Object.assign({}, this.form, result);
        this.loading = false;
      });
    },
    // 打开弹窗之前的回调
    beforeOpen() {
      if (this.type === "add" && this.initTime) {
        this.form.time = this.initTime;
      }
      if (this.type === "edit" && this.id) {
        this.getTodoDetail();
      }
    },
    show() {
      this.visible = true;
    },
    handleSure(formName) {
      this.$refs[formName].validate((valide) => {
        if (valide) {
          const result = {
            ...this.form,
            userId: this.user._id,
          };
          this.type === "add" ? this.addTodo(result) : this.editTodo(result);
        } else {
          this.$message.error("请正确填写信息");
        }
      });
    },
    // 触发dispatch更新todo
    updateTodos(payload) {
      this.$store.dispatch("todo/shouldUpdate", payload);
    },
    // 编辑
    editTodo(params) {
      editTodo(params).then(() => {
        this.$message.success("修改成功");
        this.updateTodos(params.time);
        this.visible = false;
      });
    },
    // 新增
    addTodo(params) {
      addTodo(params).then(() => {
        this.$message.success("添加成功");
        this.updateTodos(params.time);
        this.visible = false;
      });
    },
  },
};
</script>

<style></style>
