const components = [
  "ButtonAnimation",
  "CompositionInput",
  "DatePicker",
  "LazyLoad",
  "MagnifyingGlass",
  "MagnifyingView",
  "MasonryLayouts",
  "TimePicker",
];
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
    githubReact:
      "https://github.com/Qiangming-L/Extensible-Components/tree/main/components/ButtonAnimation/react",
    codeSandboxVue: "",
    githubVue: "",
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
    githubReact:
      "https://github.com/Qiangming-L/Extensible-Components/tree/main/components/CompositionInput/react",
    codeSandboxVue: "",
    githubVue: "",
  },
  DatePicker: {
    title: "DatePicker",
    text: "日期选择框",
    reference:
      "引用 <a class='content-reference' target='view_window' href='https://github.com/Qiangming-L/Extensible-Components/blob/main/mixins/timestamp.tsx'>mixins/timestamp</a>",
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
        instructions: "弹出层显示日期",
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
    codeSandboxReact: "https://codesandbox.io/s/sleepy-grass-9080ed?file=/src",
    githubReact:
      "https://github.com/Qiangming-L/Extensible-Components/tree/main/components/DatePicker/react",
    codeSandboxVue: "",
    githubVue: "",
    special: `dateSegmentSelection的优先级最高,monthSegmentSelection次之,yearSegmentSelection最低
      <br/>
      日期的范围选择起始日期的00:00:00,终点日期前一天的23:59:59
      `,
    chilren: [
      {
        title: "DatePicker => DatePickerTitle",
        text: "日期前进/后退一个单位",
        reference:
          "引用 <a class='content-reference' target='view_window' href='https://github.com/Qiangming-L/Extensible-Components/blob/main/mixins/timestamp.tsx'>mixins/timestamp</a>",
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
        codeSandboxReact: "",
        githubReact:
          "https://github.com/Qiangming-L/Extensible-Components/tree/main/components/DatePicker/react/datePickerTitle",
        codeSandboxVue: "",
        githubVue: "",
      },
      {
        title: "DatePicker => DatePopuop",
        text: "日期选择器的弹出层",
        reference:
          "引用 <a class='content-reference' target='view_window' href='https://github.com/Qiangming-L/Extensible-Components/blob/main/mixins/timestamp.tsx'>mixins/timestamp</a>",
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
        codeSandboxReact: "",
        githubReact:
          "https://github.com/Qiangming-L/Extensible-Components/tree/main/components/DatePicker/react/date",
        codeSandboxVue: "",
        githubVue: "",
      },
      {
        title: "DatePicker => DatePopuop => DateMemo",
        text: "日期选择器渲染组件",
        reference:
          "引用 <a class='content-reference' target='view_window' href='https://github.com/Qiangming-L/Extensible-Components/blob/main/mixins/timestamp.tsx'>mixins/timestamp</a>",
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
        codeSandboxReact: "",
        githubReact:
          "https://github.com/Qiangming-L/Extensible-Components/blob/main/components/DatePicker/react/date/dateMemo.tsx",
        codeSandboxVue: "",
        githubVue: "",
        special: "dataArr 中的 which 用作 className",
      },
    ],
  },
  LazyLoad: {
    title: "LazyLoad",
    text: "图片的懒加载",
    reference:
      "引用 <a class='content-reference' target='view_window' href='https://github.com/Qiangming-L/Extensible-Components/tree/main/components/LazyLoad/img'>LazyLoad/img/default.gif</a>",
    tbody: [
      {
        propsName: "data",
        instructions: "图片所需信息",
        type: "{url: string, imgWidth?: number | string, imgHeight?: number | string, showImg?: boolean, number?: number}",
        default: "-",
      },
      {
        propsName: "[defaultImg]",
        instructions: "加载图片",
        type: "string",
        default: "default.gif",
      },
      {
        propsName: "[className]",
        instructions: "自定义class",
        type: "string",
        default: "-",
      },
      {
        propsName: "[children]",
        instructions: "子元素",
        type: "HTML",
        default: "-",
      },
    ],
    codeSandboxReact:
      "https://codesandbox.io/s/currying-waterfall-5gtily?file=/src",
    githubReact:
      "https://github.com/Qiangming-L/Extensible-Components/tree/main/components/LazyLoad/react",
    codeSandboxVue: "",
    githubVue: "",
    special:
      "组件使用 <a class='link' target='view_window' href='https://www.w3.org/TR/intersection-observer/' >IntersectionObserver</a> <br/>data 中的 showImg 用于是否启用图片懒加载, number 用于记录该图片的 index",
  },
  MagnifyingGlass: {
    title: "MagnifyingGlass",
    text: "图片放大镜效果",
    tbody: [
      {
        propsName: "url",
        instructions: "图片src",
        type: "string",
        default: "-",
      },
      {
        propsName: "[children]",
        instructions: "子元素",
        type: "HTML",
        default: "-",
      },
      {
        propsName: "[className]",
        instructions: "自定义组件calss",
        type: "string",
        default: "-",
      },
      {
        propsName: "[normalStyle]",
        instructions: "图片宽高",
        type: "{width?: number, height?: number}",
        default: "{width:600}",
      },
      {
        propsName: "[maskLayerStyle]",
        instructions: "图片线上范围遮罩层",
        type: "{width?: number, height?: number}",
        default: "{width:200}",
      },
      {
        propsName: "[multiple]",
        instructions: "放大镜效果图为遮罩层倍数",
        type: "number",
        default: "2",
      },
      {
        propsName: "[mouseEvent]",
        instructions: "鼠标事件",
        type: "(type, event) => {}",
        default: "-",
      },
    ],
    codeSandboxReact: "https://codesandbox.io/s/old-currying-nl1n3n?file=/src",
    githubReact:
      "https://github.com/Qiangming-L/Extensible-Components/tree/main/components/MagnifyingGlass/react",
    codeSandboxVue: "",
    githubVue: "",
  },
  MagnifyingView: {
    title: "MagnifyingView",
    text: "图片查看",
    tbody: [
      {
        propsName: "children",
        instructions: "子元素",
        type: "HTML",
        default: "-",
      },
      {
        propsName: "[isImmediately]",
        instructions: "是否直接使用查看状态",
        type: "boolean",
        default: "false",
      },
      {
        propsName: "[className]",
        instructions: "自定义组件class",
        type: "string",
        default: "-",
      },
      {
        propsName: "[childClassName]",
        instructions: "自定义子元素class",
        type: "string",
        default: "-",
      },
      {
        propsName: "[style]",
        instructions: "自定义查看器样式",
        type: "{width?: number | string, height?: number | string, top?: number | string, left?: number | string, backgroundColor?: string,}",
        default: "-",
      },
      {
        propsName: "[time]",
        instructions: "图片查看动画",
        type: "number",
        default: "500",
      },
      {
        propsName: "[magnifyingEndStyle]",
        instructions: "自定义图片查看时 遮罩层 css 样式",
        type: "{width: number | string = '100%', height?: number | string = '100%', top?: number | string =' 0, left?: number | string = 0', backgroundColor?: string = 'rgba(0, 0, 0, 0.5)',}",
        default: "-",
      },
      {
        propsName: "[parentOnClick]",
        instructions: "包裹层点击事件",
        type: "() => {}",
        default: "-",
      },
    ],
    codeSandboxReact: "https://codesandbox.io/s/misty-voice-vw7hrp?file=/src",
    githubReact:
      "https://github.com/Qiangming-L/Extensible-Components/blob/main/components/MagnifyingView/react",
    codeSandboxVue: "",
    githubVue: "",
    special: "",
  },
  MasonryLayouts: {
    title: "MasonryLayouts",
    text: "瀑布流图片显示",
    chilren: [
      {
        title: "Equal-Height",
        text: "瀑布流-等高",
        reference:
          "引用 <a class='content-reference' target='view_window' href='https://github.com/Qiangming-L/Extensible-Components/tree/main/components/LazyLoad/react'>components/LazyLoad</a><a class='content-reference' target='view_window' href='https://github.com/Qiangming-L/Extensible-Components/blob/main/mixins/antiShake.tsx'>mixins/antiShake</a>",
        tbody: [
          {
            propsName: "masonryLayoutsArray",
            instructions: "渲染数据",
            type: "[{url: string}]",
            default: "-",
          },
          {
            propsName: "[masonryLayoutsStyle]",
            instructions: "自定义 css",
            type: "CSSStyle",
            default: "-",
          },
          {
            propsName: "[minDifference]",
            instructions: "每一列图片总宽与屏幕最小差",
            type: "number",
            default: "50",
          },
          {
            propsName: "[minWidth]",
            instructions: "容器最小宽度",
            type: "number",
            default: "300",
          },
          {
            propsName: "[className]",
            instructions: "自定义组件 class",
            type: "string",
            default: "-",
          },
        ],
        codeSandboxReact:
          "https://codesandbox.io/s/green-microservice-r33hpb?file=/src",
        githubReact:
          "https://github.com/Qiangming-L/Extensible-Components/blob/main/components/MasonryLayouts/Equal-Height/Horizontal-Arrangement/react",
        codeSandboxVue: "",
        githubVue: "",
      },
      {
        title: "Equal-Width",
        text: "瀑布流-等宽",
        reference:
          "引用 <a target='view_window' class='content-reference' href='https://github.com/Qiangming-L/Extensible-Components/tree/main/components/LazyLoad/react'>components/LazyLoad</a><a target='view_window' class='content-reference' href='https://github.com/Qiangming-L/Extensible-Components/blob/main/mixins/antiShake.tsx'>mixins/antiShake</a>",
        tbody: [
          {
            propsName: "masonryLayoutsArray",
            instructions: "渲染数据",
            type: "[{url: string}]",
            default: "-",
          },
          {
            propsName: "[masonryLayoutsStyle]",
            instructions: "自定义 css",
            type: "CSSStyle",
            default: "-",
          },
          {
            propsName: "[minWidth]",
            instructions: "图片最小宽度",
            type: "number",
            default: "300",
          },
          {
            propsName: "[className]",
            instructions: "自定义组件 class",
            type: "string",
            default: "-",
          },
        ],
        codeSandboxReact:
          "https://codesandbox.io/s/exciting-voice-vwwxy1?file=/src/",
        githubReact:
          "https://github.com/Qiangming-L/Extensible-Components/blob/main/components/MasonryLayouts/Equal-Width/Horizontal-Arrangement/react",
        codeSandboxVue: "",
        githubVue: "",
        special: "",
      },
    ],
  },
  TimePicker: {
    title: "TimePicker",
    text: "时间选择器",
    reference: "",
    tbody: [
      {
        propsName: "[className]",
        instructions: "自定义组件 class",
        type: "string",
        default: "-",
      },
      {
        propsName: "[classNamePopup]",
        instructions: "自定义弹出层组件 class",
        type: "string",
        default: "-",
      },
      {
        propsName: "[placeholder]",
        instructions: "输入框内提示文字",
        type: "string",
        default: "请选择时间",
      },
      {
        propsName: "[showClearButton]",
        instructions: "是否启用选择框中的清除按钮",
        type: "boolean",
        default: "true",
      },
      {
        propsName: "[optionHeight]",
        instructions: "时间选项元素高度",
        type: "number",
        default: "30",
      },
      {
        propsName: "[amount]",
        instructions: "显示多少列(只能是单数)",
        type: "number",
        default: "11",
      },
      {
        propsName: "[defaultTime]",
        instructions: "默认时间",
        type: "string",
        default: "00:00:00",
      },
    ],
    codeSandboxReact: "https://codesandbox.io/s/awesome-noyce-w5dhem?file=/src",
    githubReact:
      "https://github.com/Qiangming-L/Extensible-Components/blob/main/components/TimePicker/react",
    codeSandboxVue: "",
    githubVue: "",
    chilren: [
      {
        title: "TimePicker => TimePopup",
        text: "时间选择器逻辑组件",
        reference:
          "引用 <a class='content-reference' target='view_window' href='https://github.com/Qiangming-L/Extensible-Components/blob/main/mixins/antiShake.tsx'>mixins/antiShake</a>",
        tbody: [
          {
            propsName: "maxTime",
            instructions: "最大显示时间",
            type: "number",
            default: "-",
          },
          {
            propsName: "[moduleName]",
            instructions: "当前模块名",
            type: "hours | minutes | seconds",
            default: "-",
          },
          {
            propsName: "[optionHeight]",
            instructions: "时间选项元素高度",
            type: "number",
            default: "30",
          },
          {
            propsName: "[amount]",
            instructions: "显示多少列(只能是单数)",
            type: "number",
            default: "11",
          },
          {
            propsName: "[defaultTime]",
            instructions: "默认时间",
            type: "number",
            default: "0",
          },
          {
            propsName: "[selectedTimeFun]",
            instructions: "选择时间后触发事件",
            type: "(time, moduleName) => {}",
            default: "-",
          },
        ],
        codeSandboxReact: "",
        githubReact:
          "https://github.com/Qiangming-L/Extensible-Components/blob/main/components/TimePicker/react/time",
        codeSandboxVue: "",
        githubVue: "",
      },
      {
        title: "TimePicker => TimeMemo",
        text: "时间选择器渲染组件",
        tbody: [
          {
            propsName: "showArr",
            instructions: "时间渲染数据",
            type: "[{value: string | number, key?: string | number}]",
            default: "-",
          },
          {
            propsName: "currentTime",
            instructions: "选中的时间",
            type: "number | string",
            default: "-",
          },
          {
            propsName: "[optionHeight]",
            instructions: "时间选项元素高度",
            type: "number",
            default: "30",
          },
          {
            propsName: "[amount]",
            instructions: "显示多少列(只能是单数)",
            type: "number",
            default: "11",
          },
          {
            propsName: "[style]",
            instructions: "自定义组件样式",
            type: "CSSStyle",
            default: "-",
          },
          {
            propsName: "[onScroll]",
            instructions: "鼠标滚轮事件",
            type: "(event) => {}",
            default: "-",
          },
        ],
        codeSandboxReact: "",
        githubReact:
          "https://github.com/Qiangming-L/Extensible-Components/blob/main/components/TimePicker/react/time/timeMemo.tsx",
        codeSandboxVue: "",
        githubVue: "",
        special: "",
      },
    ],
  },
};

// const text = {
//   title: "",
//   text: "",
//   reference: "",
//   tbody: [
//     {
//       propsName: "",
//       instructions: "",
//       type: "",
//       default: "-",
//     },
//   ],
//   codeSandboxReact: "",
//   githubReact: "",
//   codeSandboxVue: "",
//   githubVue: "",
//   special: "",
// };
