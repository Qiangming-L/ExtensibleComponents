const components = ["ButtonAnimation", "CompositionInput", "DatePicker"];
const dataArr = {
  ButtonAnimation: {
    title: "ButtonAnimation",
    text: "按钮点击小特效",
    tbody: [
      {
        propsName: "children",
        instructions: "子元素",
        type: "ReactNode",
        default: "-",
      },
    ],
    codeSandboxReact:
      "https://codesandbox.io/s/stoic-surf-08qnte?file=/src/App.tsx",
    codeSandboxVue: "",
  },
  CompositionInput: {
    title: "CompositionInput",
    text: "可以进行中文输入的输入框(类中文输入事件，输入完成后触发)",
    tbody: [
      {
        propsName: "[disallowChange]",
        instructions: "是否禁用 change 事件",
        type: "boolean",
        default: "false",
      },
      {
        propsName: "[disallowComposition]",
        instructions: "是否禁用 compositionstart/compositionend 事件",
        type: "boolean",
        default: "true",
      },
      {
        propsName: "[disallowBlurFocus]",
        instructions: "是否禁用 blur/focus 事件",
        type: "boolean",
        default: "true",
      },
      {
        propsName: "[placeholder]",
        instructions: "输入框内提示文字",
        type: "string",
        default: "-",
      },
      {
        propsName: "[handleChange]",
        instructions: "输入框中内容发生变化时调用函数",
        type: "([value, event]) => {}",
        default: "-",
      },
      {
        propsName: "[composition]",
        instructions:
          "input 在 compositionstart/compositionend 时触发事件(主要适用于类中文输入)",
        type: "([value, type, event]) => {}",
        default: "-",
      },
      {
        propsName: "[blurFocus]",
        instructions: "input 在 blur/focus 时触发事件",
        type: "([value, type, event]) => {}",
        default: "-",
      },
    ],
    codeSandboxReact: "https://codesandbox.io/s/charming-night-9q8enl",
    codeSandboxVue: "",
  },
  DatePicker: {
    title: "DatePicker",
    text: "日期选择框",
    tbody: [
      {
        propsName: "[className]",
        instructions: "选择器类名",
        type: "string",
        default: "-",
      },
      {
        propsName: "[classNamePopup]",
        instructions: "选择器弹出框类名",
        type: "string",
        default: "-",
      },
      {
        propsName: "[placeholder]",
        instructions: "输入框内提示文字",
        type: "string",
        default: "请选择日期",
      },
      {
        propsName: "[selectionDate]",
        instructions: "默认选中日期",
        type: "Date",
        default: "-",
      },
      {
        propsName: "[popupPlate]",
        instructions: "弹出框显示内容",
        type: "year / month / date",
        default: "date",
      },
      {
        propsName: "[defaultDate]",
        instructions: "默认选中日期",
        type: "Date / [Date] / {start?: Date, end?:Date} / string(2022-2-2)",
        default: "-",
      },
      {
        propsName: "[disableDate]",
        instructions: "禁用日期",
        type: "Date / [Date] / {start?: Date, end?:Date} / string(2022-2-2",
        default: "-",
      },
      {
        propsName: "[dateSegmentSelection]",
        instructions: "是否开启日期的范围选择",
        type: "boolean",
        default: "false",
      },
      {
        propsName: "[monthSegmentSelection]",
        instructions: "是否开启月份的范围选择",
        type: "boolean",
        default: "false",
      },
      {
        propsName: "[yearSegmentSelection]",
        instructions: "是否开启年份的范围选择",
        type: "boolean",
        default: "false",
      },
      {
        propsName: "[showClearButton]",
        instructions: "是否启用选择框中的清除按钮",
        type: "boolean",
        default: "true",
      },
      {
        propsName: "[disableHeaderButton]",
        instructions: "是否禁用弹出框 header 上显示年月时间的点击事件",
        type: "boolean",
        default: "true",
      },
      {
        propsName: "[daysText]",
        instructions: "星期几所显示文字(第一个天为星期天)",
        type: "['日', '一', ...]",
        default: "-",
      },
      {
        propsName: "[monthText]",
        instructions: "月份所显示文字",
        type: "['一月', '二月', ...]",
        default: "-",
      },
      {
        propsName: "[onChange]",
        instructions: "输入框内容发生变化所调用事件",
        type: "(value) => {}",
        default: "-",
      },
    ],
    codeSandboxReact: "",
    codeSandboxVue: "",
    special: `dateSegmentSelection的优先级最高,monthSegmentSelection次之,yearSegmentSelection最低
      <br/>
      日期的范围选择起始日期的00:00:00,终点日期的23:59:59
      `,
    chilren: [
      {
        title: "DatePicker => DatePickerTitle",
        text: "日期前进/后退一个单位",
        tbody: [
          {
            propsName: "popupPlate",
            instructions: "当前显示的模块名称",
            type: "year / month / date",
            default: "-",
          },
          {
            propsName: "defaultYear",
            instructions: "当前显示的年份",
            type: "string(YYYY)",
            default: "今年",
          },
          {
            propsName: "defaultMonth",
            instructions: "当前显示的月份",
            type: "string(MM)",
            default: "当月",
          },
          {
            propsName: "onClick",
            instructions: "点击按钮触发事件",
            type: "(data:{year: 'YYYY', month: 'MM'}, event) => {}",
            default: "当月",
          },
        ],
      },
      {
        title: "DatePicker => DatePopuop",
        text: "日期选择器的弹出层",
        tbody: [
          {
            propsName: "[monthText]",
            instructions: "月份所显示文字",
            type: "['一月', '二月', ...]",
            default: "-",
          },
          {
            propsName: "[daysText]",
            instructions: "星期几所显示文字(第一个天为星期天)",
            type: "['日', '一', ...]",
            default: "-",
          },
          {
            propsName: "[month]",
            instructions: "当前弹出框显示的月份",
            type: "string(MM)",
            default: "当月",
          },
          {
            propsName: "[year]",
            instructions: "当前弹出框显示的年份",
            type: "string(YYYY)",
            default: "今年",
          },
          {
            propsName: "[defaultDate]",
            instructions: "默认选中日期",
            type: "Date / [Date] / {start?: Date, end?:Date} / string(2022-2-2)",
            default: "-",
          },
          {
            propsName: "[disableDate]",
            instructions: "禁用日期",
            type: "Date / [Date] / {start?: Date, end?:Date} / string(2022-2-2)",
            default: "-",
          },
          {
            propsName: "[segmentSelection]",
            instructions: "是否开启范围选择",
            type: "boolean",
            default: "false",
          },
          {
            propsName: "[moduleName]",
            instructions: "当前弹出层显示模块",
            type: "year / month / date",
            default: "-",
          },
          {
            propsName: "[disableHeaderButton]",
            instructions: "是否禁用弹出框 header 上显示年月时间的点击事件",
            type: "boolean",
            default: "true",
          },
        ],
      },
      {
        title: "DatePicker => DatePopuop => DateMemo",
        text: "日期选择器渲染组件",
        tbody: [
          {
            propsName: "dataArr",
            instructions: "渲染组件所需数据",
            type: "[{fullData: 'xxxx-xx-xx',<br/>text: 'xxxx-xx-xx',<br/>isDisableDate: boolean,<br/>isSelecteDate: boolean,<br/>isFalseChoice: boolean,<br/>which?: date-picker-before | date-picker-current | date-picker-after}]",
            default: "-",
          },
          {
            propsName: "[monthText]",
            instructions: "月份所显示文字",
            type: "['一月', '二月', ...]",
            default: "-",
          },
          {
            propsName: "[daysText]",
            instructions: "星期几所显示文字(第一个天为星期天)",
            type: "['日', '一', ...]",
            default: "-",
          },
          {
            propsName: "[children]",
            instructions: "子元素",
            type: "ReactNode",
            default: "-",
          },
          {
            propsName: "[moduleName]",
            instructions: "当前弹出层显示模块",
            type: "year / month / date",
            default: "-",
          },
          {
            propsName: "[disableHeaderButton]",
            instructions: "是否禁用弹出框 header 上显示年月时间的点击事件",
            type: "boolean",
            default: "true",
          },
        ],
        special: "dataArr 中的 which 用作 className",
      },
    ],
  },
};

// const text = {
//   title: "ButtonAnimation",
//   text: "一个按钮点击小特效",
//   tbody: [
//     {
//       propsName: "children",
//       instructions: "子元素",
//       type: "ReactNode",
//       default: "-",
//     },
//   ],
//   codeSandboxReact:
//     "https://codesandbox.io/s/stoic-surf-08qnte?file=/src/App.tsx",
//   codeSandboxVue: "",
// };
