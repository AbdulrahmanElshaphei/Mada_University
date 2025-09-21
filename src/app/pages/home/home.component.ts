import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private toastr: ToastrService) {

  }


  // Program Master
  selectedProgram: string | null = null;
  selectedContent: string | null = null;
  selectedTitle: string | null = null;
  selectedIcon: string | null = null;


  // هنا كل تفاصيل الكروت
  programsDetails: { [key: string]: { title: string; content: string; icon: string } } = {
    'ماجستير إدارة الأعمال التنفيذي': {
      title: 'للقادة الذين يصنعون المستقبل.',
      content: 'برنامج مكثف ومصمم خصيصًا للمديرين ذوي الخبرة، يركز على القيادة الاستراتيجية، وإدارة التحول المؤسسي، واتخاذ القرارات المعقدة. من خلال دراسات حالة متقدمة ومحاكاة للواقع، ستكتسب رؤى عميقة تمكنك من قيادة شركتك نحو آفاق جديدة من النجاح.',
      icon: 'fa-briefcase'
    },
    'ماجستير القيادة وإدارة التغيير': {
      title: 'قُد التغيير بنجاح، بدلاً من أن تكون ضحيته.',
      content: 'في بيئة الأعمال سريعة التغير، أصبحت القدرة على قيادة التغيير هي المهارة الأهم. يمنحك هذا البرنامج الأدوات والاستراتيجيات اللازمة لتخطيط مبادرات التغيير، والتغلب على مقاومة الموظفين، وبناء ثقافة مؤسسية مرنة ومبتكرة.',
      icon: 'fa-people-arrows'
    },
    'ماجستير استراتيجيات الأعمال الرقمية': {
      title: 'حوّل مؤسستك إلى قوة رقمية مهيمنة.',
      content: 'هذا البرنامج ليس عن التكنولوجيا، بل عن كيفية استخدامها كأداة استراتيجية. تعلم كيفية بناء نماذج أعمال رقمية، ودمج الذكاء الاصطناعي في العمليات، والاستفادة من البيانات الضخمة لخلق ميزة تنافسية مستدامة في السوق.',
      icon: 'fa-digital-tachograph'
    },
    'ماجستير في الإدارة المالية التنفيذية': {
      title: 'تكلم لغة الأرقام بطلاقة، واتخذ قرارات مالية بثقة.',
      content: 'مصمم للمديرين غير الماليين ورجال الأعمال، يزودك هذا البرنامج بالمعرفة اللازمة لفهم التقارير المالية، وتقييم الاستثمارات، وإدارة رأس المال، ووضع استراتيجيات تمويل تدعم نمو شركتك.',
       icon: 'fas fa-coins'
    },
    'ماجستير في إدارة العمليات وسلاسل الإمداد العالمية': {
      title: 'صمم عمليات تتسم بالكفاءة والمرونة على مستوى عالمي.',
      content: 'تعلم كيفية تحسين كفاءة العمليات التشغيلية، وإدارة سلاسل الإمداد المعقدة عبر الحدود، واستخدام التكنولوجيا لتقليل التكاليف وزيادة سرعة الاستجابة لمتطلبات السوق المتغيرة.',
       icon: 'fa-truck'
    },
    'ماجستير في التسويق الاستراتيجي وبناء العلامات التجارية': {
      title: 'ابنِ علامة تجارية لا تُنسى، وولاءً يدوم.',
      content: 'تجاوز مجرد الإعلانات والحملات. يركز هذا البرنامج على كيفية بناء استراتيجية تسويق متكاملة، وخلق هوية قوية للعلامة التجارية، وفهم سيكولوجية العملاء لبناء علاقات طويلة الأمد.',
       icon: 'fa-bullhorn'
    },
    'ماجستير في إدارة المواهب والقيادة': {
      title: 'اجذب أفضل العقول، وحافظ عليها، وألهمها لتحقيق المستحيل.',
      content: 'المنافسة الحقيقية اليوم هي على المواهب. تعلم كيفية تصميم استراتيجيات متقدمة لجذب الكفاءات، وتطوير قادة المستقبل داخل مؤسستك، وخلق بيئة عمل تجعل من شركتك الخيار الأول لأفضل الموظفين.',
      icon: 'fa-user-tie'
    },
    'ماجستير في علوم البيانات للمديرين التنفيذيين': {
      title: 'حوّل البيانات إلى أرباح.',
      content: 'لست بحاجة لأن تكون مبرمجًا، بل قائدًا يفهم قوة البيانات. يركز هذا البرنامج على كيفية طرح الأسئلة الصحيحة، وتفسير التحليلات، واستخدام الرؤى المستخلصة من البيانات لاتخاذ قرارات تجارية أكثر ذكاءً وسرعة.',
      icon: 'fa-database'
    },
    'ماجستير إدارة المشاريع': {
      title: 'حوّل الأفكار إلى إنجازات عظيمة.',
      content: 'هل لديك شغف بتحويل الخطط إلى واقع ملموس؟ في عالم الأعمال اليوم، كل مبادرة كبرى هي مشروع ينتظر قائدًا محترفًا. برنامجنا في إدارة المشاريع يمنحك الأدوات والمنهجيات اللازمة لقيادة الفرق، وإدارة الميزانيات، والالتزام بالجداول الزمنية بدقة.',
      icon: 'fa-diagram-project'
    },
    'ماجستير إدارة المخاطر': {
      title: 'تنبأ بالتحديات قبل وقوعها، وحوّلها إلى فرص.',
      content: 'النجاح لا يكمن فقط في تحقيق الأرباح، بل في حماية المؤسسة من المفاجآت. في هذا البرنامج، ستتعلم كيف ترى ما لا يراه الآخرون؛ ستكتسب القدرة على تحليل المخاطر المالية والتشغيلية والاستراتيجية، ووضع خطط استباقية لتحويلها إلى نقاط قوة.',
      icon: 'fa-shield-alt'
    },
    'ماجستير العلاقات العامة': {
      title: 'اصنع السمعة التي تستحقها علامتك التجارية.',
      content: 'هذا البرنامج يعلمك فن وعلم بناء صورة ذهنية إيجابية ودائمة. ستتقن مهارات التواصل الاستراتيجي، ورواية القصص المؤثرة، وإدارة الأزمات بذكاء، وبناء علاقات قوية مع الإعلام والجمهور.',
      icon: 'fa-handshake'
    },
    'ماجستير التقنية المالية (FinTech)': {
      title: 'قُد الثورة المالية القادمة.',
      content: 'هذا البرنامج يضعك في قلب الثورة المالية؛ حيث ستجمع بين الخبرة المالية وقوة التكنولوجيا. ستغوص في عوالم البلوك تشين، والمدفوعات الرقمية، والذكاء الاصطناعي في الاستثمار، والإقراض الرقمي.',
      icon: 'fa-credit-card'
    },
    'ماجستير الأمن السيبراني': {
      title: 'كن الدرع الذي يحمي العالم الرقمي.',
      content: 'يمنحك هذا البرنامج المعرفة والمهارات المتقدمة لكشف التهديدات، وحماية البيانات الحساسة، وبناء حصون رقمية منيعة. ستتعلم القرصنة الأخلاقية، والتحليل الجنائي الرقمي، وتأمين الشبكات السحابية.',
      icon: 'fa-lock'
    },
    'ماجستير الذكاء الاصطناعي': {
      title: 'لا تشاهد المستقبل، بل قم ببنائه.',
      content: 'هذا البرنامج يضع بين يديك القدرة على بناء أنظمة ذكية قادرة على التعلم والتفكير واتخاذ القرار. ستتقن تعلم الآلة، ومعالجة اللغات، ورؤية الكمبيوتر، وستكون قادرًا على ابتكار حلول ثورية في كل المجالات.',
       icon: 'fa-robot'
    },
    'ماجستير الإعلام الرقمي': {
      title: 'أتقن فن التأثير في العصر الرقمي.',
      content: 'في هذا البرنامج، ستتعلم كيف تصنع محتوى جذابًا يتصدر المشهد، وكيف تبني مجتمعات متفاعلة عبر الإنترنت. من استراتيجيات الفيديو والمحتوى الفيروسي، إلى إدارة حملات وسائل التواصل الاجتماعي وتحليل بيانات الجمهور.',
      icon: 'fa-photo-film'
    },
    'ماجستير الإدارة الصحية': {
      title: 'قُد مستقبل الرعاية الصحية بكفاءة وإنسانية.',
      content: 'يجمع هذا البرنامج الفريد بين مبادئ الإدارة الحديثة ومتطلبات قطاع الرعاية الصحية المعقد. ستتعلم كيفية إدارة المستشفيات والمراكز الطبية بكفاءة، وتحسين جودة الخدمة للمرضى، ووضع سياسات صحية فعالة.',
      icon: 'fa-hospital'
    }
    // 👉 كمل باقي البرامج بنفس الشكل
  };


  openModal(program: string) {
    this.selectedProgram = program;
    const details = this.programsDetails[program];
    if (details) {
      this.selectedTitle = details.title;
      this.selectedContent = details.content;
      this.selectedIcon = details.icon;
    } else {
      this.selectedTitle = 'معلومة';
      this.selectedContent = 'لا توجد تفاصيل متاحة.';
      this.selectedIcon = 'fa-circle-info';
    }

  }

  closeModal() {
    this.selectedProgram = null;
    this.selectedContent = null;
    this.selectedIcon = 'fa-circle-info';
  }
  // Program Master





  
  // Certi
  selectedProgramCerti: string | null = null;
  selectedContentCerti: string | null = null;
  selectedTitleCerti: string | null = null;
  selectedIconCerti: string | null = null;


  // هنا كل تفاصيل الكروت
  programsDetailsCerti: { [key: string]: { title: string; content: string; icon: string } } = {
    'مدير المشاريع المحترف (PMP)': {
      title: 'سلّم مشاريعك بنجاح وفي الوقت المحدد.',
      content: 'استعد للحصول على شهادة PMP العالمية من خلال هذا البرنامج المكثف الذي يغطي جميع جوانب إدارة المشاريع وفقًا لمنهجية معهد إدارة المشاريع (PMI).',
      icon: 'fa-tasks'
    },
    'تحليل الأعمال المعتمد (CBAP)': {
      title: 'كن حلقة الوصل بين الأعمال والتكنولوجيا.',
      content: 'تعلم كيفية تحليل احتياجات المؤسسة، وتحديد المشاكل، واقتراح الحلول التي تضيف قيمة حقيقية. هذه الشهادة مثالية لمن يعمل في مجال تطوير الأنظمة وتحسين العمليات.',
      icon: 'fa-chart-line'
    },
    'القيادة والتأثير': {
      title: 'حوّل أفكارك إلى حراك.',
      content: 'برنامج مصمم خصيصًا للمديرين والقادة الذين يسعون لتعزيز مهاراتهم في الإقناع والتأثير وإلهام فرق العمل لتحقيق أهداف طموحة.',
      icon: 'fa-user-tie'
    }
  };


  openModalCerti(programCerti: string) {
    this.selectedProgramCerti = programCerti;
    const details = this.programsDetailsCerti[programCerti];
    if (details) {
      this.selectedTitleCerti = details.title;
      this.selectedContentCerti = details.content;
      this.selectedIconCerti = details.icon;
    } else {
      this.selectedTitleCerti = 'معلومة';
      this.selectedContentCerti = 'لا توجد تفاصيل متاحة.';
      this.selectedIconCerti = 'fa-circle-info';
    }

  }

  closeModalCerti() {
    this.selectedProgramCerti = null;
    this.selectedContentCerti = null;
    this.selectedIconCerti = 'fa-circle-info';
  }
  // Certi


  // Program PHD
  selectedProgramPHD: string | null = null;
  selectedContentPHD: string | null = null;
  selectedTitlePHD: string | null = null;
  selectedIconPHD: string | null = null;


  // هنا كل تفاصيل الكروت
  programsDetailsPHD: { [key: string]: { title: string; content: string; icon: string } } = {
    'دكتوراه في إدارة الأعمال (DBA)': {
      title: 'من قمة الخبرة إلى قمة الفكر.',
      content: 'البرنامج الأرقى للقادة التنفيذيين. قم بإجراء بحث تطبيقي يحل تحديًا استراتيجيًا في شركتك أو صناعتك، وساهم في توليد معرفة جديدة يمكن تطبيقها مباشرة في عالم الأعمال.',
      icon: 'fa-briefcase'
    },
    'دكتوراه في القيادة الاستراتيجية': {
      title: 'ارسم ملامح المستقبل.',
      content: 'تجاوز الإدارة اليومية وركز على البحث في مستقبل الصناعات، ونماذج القيادة الفعالة في أوقات الأزمات، وكيفية بناء منظمات قادرة على التكيف والازدهار على المدى الطويل.',
      icon: 'fa-chess-king'
    },
    'دكتوراه في التحول الرقمي': {
      title: 'كن مهندس الاقتصاد الرقمي.',
      content: 'ابحث في كيفية تأثير التقنيات الناشئة مثل الذكاء الاصطناعي والبلوك تشين على نماذج الأعمال، وساهم في وضع استراتيجيات تساعد المؤسسات على تحقيق تحول رقمي ناجح ومستدام.',
      icon: 'fa-microchip'
    },
    'دكتوراه في الإدارة': {
      title: 'من قيادة المؤسسات إلى قيادة الفكر الإداري.',
      content: 'لقد أتقنت فن الإدارة، والآن حان الوقت لوضع نظرياتك الخاصة. هذا البرنامج ليس لتعلم الإدارة، بل لإعادة تعريفها. ستغوص في أبحاث عميقة لتطوير نماذج قيادية جديدة، وحل المشكلات التنظيمية المعقدة.',
       icon: 'fa-building'
    },
    'دكتوراه في تقنية المعلومات': {
      title: 'لا تتبع الابتكار التكنولوجي، بل كن مصدره.',
      content: 'برنامج الدكتوراه في تقنية المعلومات هو بوابتك لإجراء أبحاث رائدة تساهم في حل التحديات التقنية الكبرى في مجالات مثل الحوسبة السحابية، أمن المعلومات، أو أنظمة المؤسسات الذكية.',
       icon: 'fa-laptop-code'
    },
    'دكتوراه في التسويق': {
      title: 'اكتشف لماذا يشتري الناس، وليس فقط كيف تبيع لهم.',
      content: 'تجاوز الحملات الإعلانية اليومية وانطلق نحو فهم أعمق لسلوك المستهلك. في هذا البرنامج، ستقوم بأبحاث متقدمة في علم النفس التسويقي، وتحليل البيانات الضخمة، وتأثير التكنولوجيا على قرارات الشراء.',
       icon: 'fa-bullhorn'
    },
    'دكتوراه في الإعلام الرقمي': {
      title: 'كن المرجع الفكري الذي يفسر عالمنا الرقمي.',
      content: 'الجميع يستخدم الإعلام الرقمي، لكن قلة قليلة تفهم تأثيره العميق. هذا البرنامج البحثي يمنحك الأدوات اللازمة لتحليل ونقد وفهم كيفية إعادة تشكيل الإعلام الرقمي لمجتمعاتنا، واقتصادنا، وثقافتنا. ستساهم أبحاثك الأصلية في الإجابة عن الأسئلة الكبرى حول مستقبل الخصوصية، وتأثير الذكاء الاصطناعي على الإعلام، وتطور التواصل الإنساني. كن الصوت الأكاديمي الرائد الذي يستشيره الجميع لفهم هذا العصر الجديد.',
      icon: 'fa-broadcast-tower'
    },
    'دكتوراه في الموارد البشرية': {
      title: 'صمم مستقبل بيئات العمل، وليس فقط إدارة الموظفين.',
      content: 'مستقبل العمل يتغير جذريًا. كن في طليعة هذا التغيير. يركز هذا البرنامج على البحث في أكبر الاتجاهات التي تشكل عالم العمل، مثل القيادة عن بعد، وإدارة المواهب العالمية، وتأثير الأتمتة على الموظفين، وبناء ثقافات مؤسسية مرنة وشاملة. أبحاثك ستساعد الشركات وصناع السياسات على تصميم بيئات عمل أكثر إنتاجية وإنسانية للأجيال القادمة. للرواد الذين يطمحون إلى أن يكونوا مهندسي مستقبل العمل.',
      icon: 'fa-users-cog'
    }
  };


  openModalPHD(programPHD: string) {
    this.selectedProgramPHD = programPHD;
    const details = this.programsDetailsPHD[programPHD];
    if (details) {
      this.selectedTitlePHD = details.title;
      this.selectedContentPHD = details.content;
      this.selectedIconPHD = details.icon;
    } else {
      this.selectedTitlePHD = 'معلومة';
      this.selectedContentPHD = 'لا توجد تفاصيل متاحة.';
      this.selectedIconPHD = 'fa-circle-info';
    }

  }

  closeModalPHD() {
    this.selectedProgramPHD = null;
    this.selectedContentPHD = null;
    this.selectedIconPHD = 'fa-circle-info';
  }
  // Program PHD




  // Contact
   formData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  isFormValid(): boolean {
    return this.formData.name.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.phone.trim() !== '' &&
      this.formData.message.trim() !== '';
  }

  sendEmail(event: Event) {
    event.preventDefault();

    if (!this.isFormValid()) {
      this.toastr.error('⚠️ من فضلك املا كل الخانات قبل الإرسال');
      return;
    }

    emailjs.send(
      'service_5ehd6gz',
      'template_4mgu01y',
      this.formData,
      'dk9EoYtRjergB12KQ'
    ).then(() => {
      this.toastr.success('تم إرسال رسالتك بنجاح ✅');
      this.formData = { name: '', email: '', phone: '', message: '' };
    }).catch(() => {
      this.toastr.error('حصل خطأ ما ❌');
    });
  }
}
