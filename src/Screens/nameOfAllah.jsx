import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const data = [
  {
    Id: 1,
    name: 'الرحمٰن',
    urdu: 'انتہائی مہربان',
    meaning: 'The Most Gracious',
  },
  {
    Id: 2,
    name: 'الرحيم',
    urdu: 'انتہائی رحم کرنے والا',
    meaning: 'The Most Merciful',
  },
  {
    Id: 3,
    name: 'الملك',
    urdu: 'مالک، بادشاہ',
    meaning: 'The Owner, The King, The Ruler',
  },
  {
    Id: 4,
    name: 'القدوس',
    urdu: 'مقدس، پاک، عیبوں سے پاک',
    meaning: 'The Absolutely Pure, The Most Holy, The Most Sacred',
  },
  {
    Id: 5,
    name: 'السلام',
    urdu: 'سلامتی والا',
    meaning: 'The Source of Peace',
  },
  {
    Id: 6,
    name: 'المؤمن',
    urdu: 'ایمان عطاء کرنے والا، امن دینے والا',
    meaning: 'The Bestower of Faith, The Granter of Security',
  },
  {
    Id: 7,
    name: 'المهيمن',
    urdu: 'محافظ',
    meaning: 'The Guardian, The Preserver',
  },
  {
    Id: 8,
    name: 'العزيز',
    urdu: 'غالب، زبردست، غلبہ والا، عزت دینے والا',
    meaning: 'The Mighty, The Invincible, The Dominant, The Bestower of Honour',
  },
  {
    Id: 9,
    name: 'الجبار',
    urdu: 'زبردست',
    meaning: 'The Compeller, The Restorer',
  },
  {
    Id: 10,
    name: 'المتكبر',
    urdu: 'بڑائی والا، بزرگی والا',
    meaning: 'The Majestic, The Supreme',
  },
  {
    Id: 11,
    name: 'الخالق',
    urdu: 'پیدا کرنے والا',
    meaning: 'The Creator, The Maker',
  },
  {
    Id: 12,
    name: 'الباري',
    urdu: 'پیدا کرنے والا',
    meaning: 'The Originator',
  },
  {
    Id: 13,
    name: 'المصور',
    urdu: 'صورت بنانے والا',
    meaning: 'The Fashioner',
  },
  {
    Id: 14,
    name: 'الغفار',
    urdu: 'بخشنے والا',
    meaning: 'The All- and Oft-Forgiving',
  },
  {
    Id: 15,
    name: 'القهار',
    urdu: 'زبردست، قہر نازل کرنے والا',
    meaning: 'The Subduer, The Ever-Dominating',
  },
  {
    Id: 16,
    name: 'الوهاب',
    urdu: 'عطاء کرنے والا',
    meaning: 'The Giver of Gifts',
  },
  {
    Id: 17,
    name: 'الرزاق',
    urdu: 'رزق دینے والا',
    meaning: 'The Provider',
  },
  {
    Id: 18,
    name: 'الفتاح',
    urdu: 'کھولنے والا',
    meaning: 'The Opener, The Judge',
  },
  {
    Id: 19,
    name: 'العليم',
    urdu: 'جاننے والا، علم والا، باخبر',
    meaning: 'The All-Knowing, The Omniscient',
  },
  {
    Id: 20,
    name: 'القابض',
    urdu: 'قبض کرنے والا',
    meaning: 'The Withholder',
  },
  {
    Id: 21,
    name: 'الباسط',
    urdu: 'فراخ کرنے والا',
    meaning: 'The Extender',
  },
  {
    Id: 22,
    name: 'الخافض',
    urdu: 'پست کرنے والا',
    meaning: 'The Reducer, The Abaser',
  },
  {
    Id: 23,
    name: 'الرافع',
    urdu: 'بلند کرنے والا',
    meaning: 'The Exalter, The Elevator',
  },
  {
    Id: 24,
    name: 'المعز',
    urdu: 'عزت دینے والا',
    meaning: 'The Honourer, The Bestower',
  },
  {
    Id: 25,
    name: 'المزيل',
    urdu: 'ذلت دینے والا',
    meaning: 'The Dishonourer, The Humiliator',
  },
  {
    Id: 26,
    name: 'السميع',
    urdu: 'سننے والا',
    meaning: 'The All-Hearing',
  },
  {
    Id: 27,
    name: 'البصير',
    urdu: 'دیکھنے والا',
    meaning: 'The All-Seeing',
  },
  {
    Id: 28,
    name: 'الحكم',
    urdu: 'فیصلہ کرنے والا، حاکم',
    meaning: 'The Judge, The Giver of Justice',
  },
  {
    Id: 29,
    name: 'العدل',
    urdu: 'انصاف کرنے والا',
    meaning: 'The Utterly Just',
  },
  {
    Id: 30,
    name: 'اللطيف',
    urdu: 'مہربان',
    meaning: 'The Subtle One, The Most Gentle',
  },
  {
    Id: 31,
    name: 'الخبير',
    urdu: 'خبردار، جاننے والا،خبر رکھنے والا',
    meaning: 'The Acquainted, the All-Aware',
  },
  {
    Id: 32,
    name: 'الحليم',
    urdu: 'بردبار',
    meaning: 'The Most Forbearing',
  },
  {
    Id: 33,
    name: 'العظيم',
    urdu: 'عظمت والا، بڑائی والا، بڑا',
    meaning: 'The Magnificent, The Supreme',
  },
  {
    Id: 34,
    name: 'الغفور',
    urdu: 'معافی دینے والا',
    meaning: 'The Forgiving, The Exceedingly Forgiving',
  },
  {
    Id: 35,
    name: 'الشكور',
    urdu: 'قدردان',
    meaning: 'The Most Appreciative',
  },
  {
    Id: 36,
    name: 'العلي',
    urdu: 'اعلیٰ، سب سے افضل، برتر',
    meaning: 'The Most High, The Exalted',
  },
  {
    Id: 37,
    name: 'الكبير',
    urdu: 'بزرگی والا',
    meaning: 'The Greatest, The Most Grand',
  },
  {
    Id: 38,
    name: 'الحفيظ',
    urdu: 'حفاظت کرنے والا، نگہبان',
    meaning: 'The Preserver, The All-Heedful and All-Protecting',
  },
  {
    Id: 39,
    name: 'المقيت',
    urdu: 'باقی رہنے والا، روزی دینے والا، نگہبان، قوت دینے والا',
    meaning: 'The Sustainer',
  },
  {
    Id: 40,
    name: 'الحسيب',
    urdu: 'حساب لینے والا',
    meaning: 'The Reckoner, The Sufficient',
  },
  {
    Id: 41,
    name: 'الجليل',
    urdu: 'بزرگ',
    meaning: 'The Majestic',
  },
  {
    Id: 42,
    name: 'الكريم',
    urdu: 'کرم کرنے والا',
    meaning: 'The Most Generous, The Most Esteemed',
  },
  {
    Id: 43,
    name: 'الرقيب',
    urdu: 'خیال رکھنے والا',
    meaning: 'The Watchful',
  },
  {
    Id: 44,
    name: 'المجيب',
    urdu: 'قبول کرنے والا',
    meaning: 'The Responsive One',
  },
  {
    Id: 45,
    name: 'الواسع',
    urdu: 'لامحدود',
    meaning: 'The All-Encompassing, the Boundless',
  },
  {
    Id: 46,
    name: 'الحكيم',
    urdu: 'حکمت والا',
    meaning: 'The All-Wise',
  },
  {
    Id: 47,
    name: 'الودود',
    urdu: 'محبت کرنے والا',
    meaning: 'The Most Loving',
  },
  {
    Id: 48,
    name: 'المجيد',
    urdu: 'بزرگی والا',
    meaning: 'The Glorious, The Most Honorable',
  },
  {
    Id: 49,
    name: 'الباعث',
    urdu: 'اسباب پیدا کرنے والا',
    meaning: 'The Resurrector, The Raiser of the Dead',
  },
  {
    Id: 50,
    name: 'الشهيد',
    urdu: 'گواہ',
    meaning: 'The All- and Ever Witnessing',
  },
  {
    Id: 51,
    name: 'الحق',
    urdu: 'سچ',
    meaning: 'The Absolute Truth',
  },
  {
    Id: 52,
    name: 'الوكيل',
    urdu: 'وکیل،کارساز',
    meaning: 'The Trustee, The Disposer of Affairs',
  },
  {
    Id: 53,
    name: 'القوي',
    urdu: 'سب سے زیادہ طاقتور',
    meaning: 'The All Strong',
  },
  {
    Id: 54,
    name: 'المتين',
    urdu: 'مضبوط، قوت والا',
    meaning: 'The Firm, The Steadfast',
  },
  {
    Id: 55,
    name: 'الولي',
    urdu: 'دوست',
    meaning: 'The Protecting Associate',
  },
  {
    Id: 56,
    name: 'الحميد',
    urdu: 'تعریف والا',
    meaning: 'The Praiseworthy',
  },
  {
    Id: 57,
    name: 'المحصي',
    urdu: 'شمار کرنے والا',
    meaning: 'The All-Enumerating, The Counter',
  },
  {
    Id: 58,
    name: 'المبدئ',
    urdu: 'عدم سے عالم کو وجود لانے والا',
    meaning: 'The Originator, The Initiator',
  },
  {
    Id: 59,
    name: 'المعيد',
    urdu: 'لوٹانے والا، پناہ دینے والا',
    meaning: 'The Restorer, The Reinstater',
  },
  {
    Id: 60,
    name: 'المحيي',
    urdu: 'زندگی دینے والا',
    meaning: 'The Giver of Life',
  },
  {
    Id: 61,
    name: 'المميت',
    urdu: 'موت دینے والا',
    meaning: 'The Bringer of Death, the Destroyer',
  },
  {
    Id: 62,
    name: 'الحي',
    urdu: 'زندہ، ہمیشہ رہنے والا',
    meaning: 'The Ever-Living',
  },
  {
    Id: 63,
    name: 'القيوم',
    urdu: 'قائم رہنے والا',
    meaning: 'The Sustainer, The Self-Subsisting',
  },
  {
    Id: 64,
    name: 'الواجد',
    urdu: 'حاصل کرنے والا',
    meaning: 'The Perceiver',
  },
  {
    Id: 65,
    name: 'الماجد',
    urdu: 'بزرگی دینے والا',
    meaning: 'The Illustrious, the Magnificent',
  },
  {
    Id: 66,
    name: 'الواحد',
    urdu: 'اکیلا',
    meaning: 'The One',
  },
  {
    Id: 67,
    name: 'الأحد',
    urdu: 'ایک',
    meaning: 'The Unique, The Only One',
  },
  {
    Id: 68,
    name: 'الصمد',
    urdu: 'بے نیاز، مضبوط',
    meaning: 'The Eternal, Satisfier of Needs',
  },
  {
    Id: 69,
    name: 'ٱلْقَادِرُ',
    urdu: 'قدرت والا',
    meaning: 'The Capable, The Powerful',
  },
  {
    Id: 70,
    name: 'المُقْتَدِر',
    urdu: 'اقتدار والا، قادر مطلق',
    meaning: 'The Omnipotent',
  },
  {
    Id: 71,
    name: 'المُقَدِّم',
    urdu: 'آگے کرنے والا',
    meaning: 'The Expediter, The Promoter',
  },
  {
    Id: 72,
    name: 'المُؤَخِّر',
    urdu: 'پیچھے کرے والا',
    meaning: 'The Delayer, the Retarder',
  },
  {
    Id: 73,
    name: 'الأَوَّل',
    urdu: 'پہلا',
    meaning: 'The First',
  },
  {
    Id: 74,
    name: 'الآخِر',
    urdu: 'آخر',
    meaning: 'The Last',
  },
  {
    Id: 75,
    name: 'الظَّاهِر',
    urdu: 'ظاہر',
    meaning: 'The Manifest',
  },
  {
    Id: 76,
    name: 'البَاطِن',
    urdu: 'چھپا ہوا، باطن کو جاننے والا',
    meaning: 'The Hidden One, Knower of the Hidden',
  },
  {
    Id: 77,
    name: 'الوَالِي',
    urdu: 'سرپرست، متولی',
    meaning: 'The Governor, The Patron',
  },
  {
    Id: 78,
    name: 'المُتَعَالِي',
    urdu: 'بزرگ',
    meaning: 'The Self Exalted',
  },
  {
    Id: 79,
    name: 'الْبَرُّ',
    urdu: 'نیکیوں کا سرچشمہ',
    meaning: 'The Source of Goodness, the Kind Benefactor',
  },
  {
    Id: 80,
    name: 'التَّوَّاب',
    urdu: 'توبہ قبول کرنے والا',
    meaning: 'The Ever-Pardoning, The Relenting',
  },
  {
    Id: 80,
    name: 'المُنْتَقِم',
    urdu: 'انتقام لینے والا',
    meaning: 'The Avenger',
  },
  {
    Id: 81,
    name: 'العَفُوُّ',
    urdu: 'معاف کرنے والا',
    meaning: 'The Pardoner',
  },
  {
    Id: 82,
    name: 'الرَّؤُف',
    urdu: 'رحم کرنے والا، شفقت کرنے والا',
    meaning: 'The Most Kind',
  },
  {
    Id: 83,
    name: 'مَالِكُ ٱلْمُلْك',
    urdu: 'دو جہاں کا مالک',
    meaning: 'Master of the Kingdom, Owner of the Dominion',
  },
  {
    Id: 84,
    name: 'ذُو الْجَلَالِ وَالْإِكْرَام',
    urdu: 'جلال اور انعام و اکرام والا',
    meaning: 'Possessor of Glory and Honour, Lord of Majesty and Generosity',
  },
  {
    Id: 85,
    name: 'المُقْسِط',
    urdu: 'انصاف کرنے والا',
    meaning: 'The Equitable, the Requiter',
  },
  {
    Id: 86,
    name: 'الجَامِع',
    urdu: 'جمع کرنے والا',
    meaning: 'The Gatherer, the Uniter',
  },
  {
    Id: 87,
    name: 'الغَني',
    urdu: 'بے پرواہ، غنی',
    meaning: 'The Self-Sufficient, The Wealthy',
  },
  {
    Id: 88,
    name: 'المُغنِي',
    urdu: 'بے نیاز',
    meaning: 'The Enricher',
  },
  {
    Id: 89,
    name: 'المَانِع',
    urdu: 'روکنے والا، باز رکھنے والا',
    meaning: 'The Withholder',
  },
  {
    Id: 90,
    name: 'الضَّار',
    urdu: 'نقصان کا مالک',
    meaning: 'The Distresser, The creator of harm',
  },
  {
    Id: 91,
    name: 'النَّافِع',
    urdu: 'نفع کا مالک، نفع دینے والا',
    meaning: 'The Propitious, the Benefactor',
  },
  {
    Id: 92,
    name: 'النُّور',
    urdu: 'روشن، روشنی دینے والا',
    meaning: 'The Light, The Illuminator',
  },
  {
    Id: 93,
    name: 'الهَادِی',
    urdu: 'ہدایت دینے والا، راستہ دکھانے والا',
    meaning: 'The Guide',
  },
  {
    Id: 94,
    name: 'البَدِيع',
    urdu: 'نادر پیدا کرنے والا',
    meaning: 'The Incomparable Originator',
  },
  {
    Id: 95,
    name: 'البَاقِی',
    urdu: 'ہمیشہ رہنے والا',
    meaning: 'The Ever-Surviving, The Everlasting',
  },
  {
    Id: 96,
    name: 'الوَارِث',
    urdu: 'وارث',
    meaning: 'The Inheritor, The Heir',
  },
  {
    Id: 97,
    name: 'الرَّشِيد',
    urdu: 'ہدایت دینے والا، رہنمائی کرنے والا',
    meaning: 'The Guide, Infallible Teacher',
  },
  {
    Id: 98,
    name: 'الصَّبُور',
    urdu: 'صبر کرنے والا',
    meaning: 'The Forbearing, The Patient',
  },
];

const NameOfAllah = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../image/nameOfAllah.jpeg')}
        style={styles.image}>
        <FlatList
          data={data}
          keyExtractor={item => item.Id}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}
          horizontal
          renderItem={({item}) => (
            <View style={styles.cardView}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.urduText}>{item.urdu}</Text>
              <Text style={styles.meaningText}>{item.meaning}</Text>
            </View>
          )}
        />
      </ImageBackground>
    </View>
  );
};

export default NameOfAllah;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardView: {
    width: wp('80%'),
    height: hp('60%'),
    backgroundColor: '#fff',
    borderRadius: hp('2%'),
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  nameText: {
    color: 'gray',
    fontSize: hp('4.5%'),
    fontWeight: '600',
  },
  urduText: {
    color: 'green',
    fontSize: hp('3%'),
    marginTop: 30,
  },
  meaningText: {
    color: '#333',
    fontSize: hp('2.5%'),
    marginTop: 20,
    textAlign: 'center',
    maxWidth: '90%',
  },
});
